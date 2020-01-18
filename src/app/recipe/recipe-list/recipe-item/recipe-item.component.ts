import { Component, Input } from '@angular/core';

import { Recipe }         from '../../recipe.model';
import { RecipesService } from '../../recipe.service';

@Component({
  selector   : 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls  : ['./recipe-item.component.scss']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;

  constructor(private recipesService: RecipesService) { }

  onSelected() {
    this.recipesService.recipeSelected.emit(this.recipe);
  }
}
