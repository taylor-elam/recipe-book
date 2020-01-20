import { HttpClient }              from '@angular/common/http';
import { Injectable }              from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap }          from 'rxjs/operators';

import { Recipe }         from '../recipe.model';
import * as RecipeActions from './recipe.actions';

const DATABASE_URI = 'https://recipe-book-55248.firebaseio.com/';
const RECIPES      = 'recipes.json';

@Injectable()
export class RecipeEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPE),
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
}
