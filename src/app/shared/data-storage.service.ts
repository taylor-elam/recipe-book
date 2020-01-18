import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map }        from 'rxjs/operators';

import { Recipe }         from '../recipe/recipe.model';
import { RecipesService } from '../recipe/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipesService: RecipesService) { }

  fetchRecipes(): void {
    this.http.get<Recipe[]>('https://ng-recipe-book-16ad0.firebaseio.com/recipes.json')
      .pipe(map(response => {
        return response.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients != null ? recipe.ingredients : [] };
        });
      }))
      .subscribe(response => {
        console.log(response);
        this.recipesService.setRecipes(response);
      });
  }

  storeRecipes(): void {
    const recipes = this.recipesService.recipes;
    this.http.put('https://ng-recipe-book-16ad0.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }
}
