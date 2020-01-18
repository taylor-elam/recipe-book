import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientsUpdated = new Subject<Ingredient[]>();
  private _ingredients: Ingredient[] = [
    new Ingredient('Apples', 10),
    new Ingredient('Tomatoes', 5)
  ];

  get ingredients(): Ingredient[] {
    return this._ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(ingredient);
    this.ingredientsUpdated.next(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsUpdated.next(this.ingredients);
  }
}
