import { Component, OnInit } from '@angular/core';
import { Recipe }            from './recipe.model';
import { RecipesService } from './recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  providers:   [RecipesService]
})
export class RecipeComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.recipesService.recipeSelected
      .subscribe(
        (recipe: Recipe) => {
          this.selectedRecipe = recipe;
        }
      );
  }
}
