import { Injectable }                                           from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Actions, ofType }                                      from '@ngrx/effects';
import { Store }                                                from '@ngrx/store';
import { take }                                                 from 'rxjs/operators';

import * as fromApp       from '../store/app.reducer';
import { Recipe }         from './recipe.model';
import { RecipeService }  from './recipe.service';
import * as RecipeActions from './store/recipe.actions';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private actions$: Actions, private recipeService: RecipeService, private store: Store<fromApp.AppState>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.recipes;

    if (recipes.length === 0) {
      this.store.dispatch(new RecipeActions.FetchRecipe());
      return this.actions$.pipe(
        ofType(RecipeActions.SET_RECIPES),
        take(1)
      );
    } else {
      return recipes;
    }
  }
}
