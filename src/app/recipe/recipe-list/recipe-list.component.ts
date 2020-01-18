import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router }                  from '@angular/router';

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

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.recipes = this.recipesService.recipes;
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
