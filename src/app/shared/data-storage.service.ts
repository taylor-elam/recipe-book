import { HttpClient }  from '@angular/common/http';
import { Injectable }  from '@angular/core';
import { Observable }  from 'rxjs';
import { map, tap }    from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

import { Recipe }        from '../recipe/recipe.model';
import { RecipeService } from '../recipe/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private recipeService: RecipeService
  ) { }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      'https://ng-recipe-book-16ad0.firebaseio.com/recipes.json'
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
    this.http.put('https://ng-recipe-book-16ad0.firebaseio.com/recipes.json', recipes).subscribe();
  }
}
