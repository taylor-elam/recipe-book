import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

import { Ingredient }          from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe }              from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipesUpdated = new Subject<Recipe[]>();
  private _recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  get recipes(): Recipe[] {
    return this._recipes;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
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
