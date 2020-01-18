import { Component, OnInit }              from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe }         from '../recipe.model';
import { RecipesService } from '../recipe.service';

@Component({
  selector   : 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls  : ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id     = +params['id'];
          this.recipe = this.recipesService.getRecipe(this.id);
        }
      );
  }

  onAddToShoppingList(): void {
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe(): void {
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
