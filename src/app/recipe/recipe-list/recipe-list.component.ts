import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector   : 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls  : ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Fish & Chips', 'Classic British fish & chips', 'https://bit.ly/2uL8q7o'),
    new Recipe('Mac & Cheese', 'Ultra creamy mac and cheese', 'https://bit.ly/2uUgNOf')
  ];

  constructor() { }

  ngOnInit() {}
}
