import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RecipesService } from '../recipe/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipesService: RecipesService) { }

  storeRecipes() {
    const recipes = this.recipesService.recipes;
    this.http.put('https://ng-recipe-book-16ad0.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }
}
