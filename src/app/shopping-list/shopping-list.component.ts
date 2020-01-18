import { Component } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector   : 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls  : ['./shopping-list.component.scss']
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 10),
    new Ingredient('Tomatoes', 5)
  ];

  constructor() { }
}
