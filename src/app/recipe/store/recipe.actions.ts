import { createAction, props } from '@ngrx/store';

import * as Interfaces from '../../shared/interfaces';

export const ADD_RECIPE    = '[Recipes] Add Recipe';
export const DELETE_RECIPE = '[Recipes] Delete Recipe';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const SET_RECIPES   = '[Recipes] Set Recipes';
export const STORE_RECIPES = '[Recipes] Store Recipes';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';

export const addRecipe    = createAction(ADD_RECIPE, props<Interfaces.Recipe>());
export const deleteRecipe = createAction(DELETE_RECIPE, props<Interfaces.Index>());
export const fetchRecipes = createAction(FETCH_RECIPES);
export const setRecipes   = createAction(SET_RECIPES, props<Interfaces.Recipes>());
export const storeRecipes = createAction(STORE_RECIPES);
export const updateRecipe = createAction(UPDATE_RECIPE, props<Interfaces.UpdateRecipe>());
