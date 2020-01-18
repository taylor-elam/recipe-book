import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientsUpdated = new Subject<Ingredient[]>();
  startedEditing     = new Subject<number>();

  private _ingredients: Ingredient[] = [
    new Ingredient('Apples', 10),
    new Ingredient('Tomatoes', 5)
  ];

  get ingredients(): Ingredient[] {
    return this._ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this._ingredients.push(ingredient);
    this.ingredientsUpdated.next(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientsUpdated.next(this.ingredients);
  }

  deleteIngredient(index: number): void {
    this._ingredients.splice(index, 1);
    this.ingredientsUpdated.next(this.ingredients);
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient): void {
    this._ingredients[index] = newIngredient;
    this.ingredientsUpdated.next(this.ingredients);
  }
}
