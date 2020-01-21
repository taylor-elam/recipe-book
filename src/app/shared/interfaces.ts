import { Recipe }     from '../recipe/recipe.model';
import { Ingredient } from './ingredient.model';

export interface AuthData {
  email: string;
  userId: string;
  token: string;
  expirationDate: Date;
  redirect: boolean;
}

export interface AuthInfo {
  email: string;
  password: string;
}

export interface ErrorMessage {
  errorMessage: string;
}

export interface Index {
  index: number;
}

export interface Ingredient {
  ingredient: Ingredient;
}

export interface Ingredients {
  ingredients: Ingredient[];
}

export interface Recipe {
  recipe: Recipe;
}

export interface Recipes {
  recipes: Recipe[];
}

export interface UpdateRecipe {
  index: number;
  recipe: Recipe;
}

export interface UserData {
  email: string;
  id: string;
  _token: string;
  _tokenExpirationDate: string;
}
