import { createAction, props } from '@ngrx/store';

import { Ingredient }  from '../../shared/ingredient.model';
import * as Interfaces from '../../shared/interfaces';

export const ADD_INGREDIENT    = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS   = '[Shopping List] Add Ingredients';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const START_EDIT        = '[Shopping List] Start Edit';
export const STOP_EDIT         = '[Shopping List] Stop Edit';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';

export const addIngredient    = createAction(ADD_INGREDIENT, props<Interfaces.Ingredient>());
export const addIngredients   = createAction(ADD_INGREDIENTS, props<Interfaces.Ingredients>());
export const deleteIngredient = createAction(DELETE_INGREDIENT, props<Interfaces.Index>());
export const startEdit        = createAction(START_EDIT, props<Interfaces.Index>());
export const stopEdit         = createAction(STOP_EDIT);
export const updateIngredient = createAction(UPDATE_INGREDIENT, props<Interfaces.Ingredient>());
