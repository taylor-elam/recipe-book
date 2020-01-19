import { HttpClient }  from '@angular/common/http';
import { Injectable }  from '@angular/core';
import { Observable }  from 'rxjs';
import { map, tap }    from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

import { Recipe }        from '../recipe/recipe.model';
import { RecipeService } from '../recipe/recipe.service';

const DATABASE_URI = 'https://recipe-book-55248.firebaseio.com/';
const RECIPES = 'recipes.json';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private recipeService: RecipeService
  ) { }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      DATABASE_URI + RECIPES
    ).pipe(
      map(response => {
        return response.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients != null ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }

  storeRecipes(): void {
    const recipes = this.recipeService.recipes;
    this.http.put(DATABASE_URI + RECIPES, recipes).subscribe();
  }
}
