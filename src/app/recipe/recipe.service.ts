import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  recipeSelected             = new EventEmitter<Recipe>();
  private _recipes: Recipe[] = [
    new Recipe('Fish & Chips', 'Classic British fish & chips', 'https://bit.ly/2uL8q7o'),
    new Recipe('Mac & Cheese', 'Ultra creamy mac and cheese', 'https://bit.ly/2uUgNOf')
  ];

  get recipes(): Recipe[] {
    return this._recipes;
  }
}
