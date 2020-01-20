import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store }      from '@ngrx/store';

import { AuthService }   from '../auth/auth.service';
import { RecipeService } from '../recipe/recipe.service';
import * as fromApp      from '../store/app.reducer';

const DATABASE_URI = 'https://recipe-book-55248.firebaseio.com/';
const RECIPES      = 'recipes.json';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) { }

  storeRecipes(): void {
    const recipes = this.recipeService.recipes;
    this.http.put(DATABASE_URI + RECIPES, recipes).subscribe();
  }
}
