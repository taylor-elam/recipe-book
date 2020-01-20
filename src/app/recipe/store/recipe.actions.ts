import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const ADD_RECIPE    = '[Recipes] Add Recipe';
export const DELETE_RECIPE = '[Recipes] Delete Recipe';
export const FETCH_RECIPE  = '[Recipes] Fetch Recipe';
export const SET_RECIPES   = '[Recipes] Set Recipes';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(private payload: Recipe) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(private payload: number) {}
}

export class FetchRecipe implements Action {
  readonly type = FETCH_RECIPE;
}

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(private payload: Recipe[]) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(private payload: { index: number, recipe: Recipe }) {}
}

export type RecipeActions =
  | AddRecipe
  | DeleteRecipe
  | FetchRecipe
  | SetRecipes
  | UpdateRecipe;
