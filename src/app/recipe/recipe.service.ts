import { Injectable } from '@angular/core';

import { Ingredient }          from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe }              from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  private _recipes: Recipe[] = [
    new Recipe('Fish & Chips',
      'Classic British fish & chips',
      'https://bit.ly/2uL8q7o',
      [
        new Ingredient('Large potatoes', 4),
        new Ingredient('All-purpose flour, cup', 1),
        new Ingredient('Baking powder, tsp', 1),
        new Ingredient('Ground black pepper, tsp', 1),
        new Ingredient('Milk, cup', 1),
        new Ingredient('Egg', 1),
        new Ingredient('Vegetable oil, qt', 1),
        new Ingredient('Cod fillets, lb', 1.5)
      ]),
    new Recipe('Mac & Cheese',
      'Ultra creamy mac and cheese',
      'https://bit.ly/2uUgNOf',
      [
        new Ingredient('Elbow macaroni, oz', 8),
        new Ingredient('Shredded sharp cheddar cheese, cup', 2),
        new Ingredient('Grated Parmesan cheese, cup', 0.5),
        new Ingredient('Milk, cup', 3),
        new Ingredient('Butter, cup', 0.25),
        new Ingredient('All-purpose flour, Tbsp', 2.5),
        new Ingredient('Butter, Tbsp', 2),
        new Ingredient('Bread crumbs, cup', 0.5),
        new Ingredient('Paprika, pinch', 1)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  get recipes(): Recipe[] {
    return this._recipes;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }
}
