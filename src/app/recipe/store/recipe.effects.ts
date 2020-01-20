import { HttpClient }                     from '@angular/common/http';
import { Injectable }                     from '@angular/core';
import { Actions, Effect, ofType }        from '@ngrx/effects';
import { Store }                          from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as fromApp       from '../../store/app.reducer';
import { Recipe }         from '../recipe.model';
import * as RecipeActions from './recipe.actions';

const DATABASE_URI = 'https://recipe-book-55248.firebaseio.com/';
const RECIPES      = 'recipes.json';

@Injectable()
export class RecipeEffects {
  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(DATABASE_URI + RECIPES);
    }),
    map(response => {
      return response.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients != null ? recipe.ingredients : []
        };
      });
    }),
    map((recipes: Recipe[]) => {
      return new RecipeActions.SetRecipes(recipes);
    })
  );

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put(DATABASE_URI + RECIPES, recipesState.recipes);
    })
  );
}
