import { Component, OnInit } from '@angular/core';

import { Ingredient }          from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector   : 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls  : ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 10),
    new Ingredient('Tomatoes', 5)
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.ingredients;
  }
}
