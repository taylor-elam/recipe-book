import { Injectable } from '@angular/core';
import { Store }      from '@ngrx/store';

import { Ingredient }           from '../shared/ingredient.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp             from '../store/app.reducer';
import { Recipe }               from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private _recipes: Recipe[] = [];

  constructor(private store: Store<fromApp.AppState>) { }

  get recipes(): Recipe[] {
    return this._recipes;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }
}
