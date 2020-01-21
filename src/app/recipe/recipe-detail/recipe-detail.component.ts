import { Component, OnInit }              from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store }                          from '@ngrx/store';
import { map, switchMap }                 from 'rxjs/operators';
import * as ShoppingListActions           from '../../shopping-list/store/shopping-list.actions';

import * as fromApp       from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import { Recipe }         from '../recipe.model';

@Component({
  selector   : 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls  : ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: Params) => +params.id),
        switchMap((id: number) => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map(recipeState => {
          return recipeState.recipes.find((recipe: Recipe, index: number) => {
            return index === this.id;
          });
        })
      )
      .subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      });
  }

  onAddToShoppingList(): void {
    this.store.dispatch(ShoppingListActions.addIngredients({ ingredients: this.recipe.ingredients }));
  }

  onDeleteRecipe(): void {
    this.store.dispatch(RecipeActions.deleteRecipe({ index: this.id }));
    this.router.navigate(['/recipes']);
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
