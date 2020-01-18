import { Component, Input } from '@angular/core';

import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Recipe }              from '../recipe.model';

@Component({
  selector   : 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls  : ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe;

  constructor(private shoppingListServices: ShoppingListService) { }

  onAddToShoppingList() {
    this.shoppingListServices.addIngredients(this.recipe.ingredients);
  }
}
