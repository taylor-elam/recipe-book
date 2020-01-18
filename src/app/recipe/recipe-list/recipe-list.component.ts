import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Recipe }         from '../recipe.model';
import { RecipesService } from '../recipe.service';

@Component({
  selector   : 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls  : ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.recipes = this.recipesService.recipes;
  }
}
