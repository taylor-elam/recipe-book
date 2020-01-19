import { Injectable } from '@angular/core';
import {Store}      from '@ngrx/store';
import { Subject }    from 'rxjs/internal/Subject';

import { Ingredient }          from '../shared/ingredient.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList    from '../shopping-list/store/shopping-list.reducer';
import { Recipe }              from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipesUpdated = new Subject<Recipe[]>();
  private _recipes: Recipe[] = [];

  constructor(private store: Store<fromShoppingList.AppState>) { }

  get recipes(): Recipe[] {
    return this._recipes;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe): void {
    this._recipes.push(recipe);
    this.recipesUpdated.next(this.recipes);
  }

  deleteRecipe(index: number): void {
    this._recipes.splice(index, 1);
    this.recipesUpdated.next(this.recipes);
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  setRecipes(recipes: Recipe[]): void {
    this._recipes = recipes;
    this.recipesUpdated.next(this.recipes);
  }

  updateRecipe(index: number, recipe: Recipe): void {
    this._recipes[index] = recipe;
    this.recipesUpdated.next(this.recipes);
  }
}
