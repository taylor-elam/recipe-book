import { Action, createReducer, on } from '@ngrx/store';

import * as Interfaces from '../../shared/interfaces';
import { Recipe }         from '../recipe.model';
import * as RecipeActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState = {
  recipes: []
};

export function recipeReducer(recipeState: State | undefined, recipeAction: Action): State {
  return createReducer(
    initialState,
    on(RecipeActions.addRecipe, (state: State, action: Interfaces.Recipe) => ({
      ...state,
      recipes: state.recipes.concat({ ...action.recipe })
    })),
    on(RecipeActions.deleteRecipe, (state: State, action: Interfaces.Index) => ({
      ...state,
      recipes: state.recipes.filter((recipe, index) => index !== action.index)
    })),
    on(RecipeActions.setRecipes, (state: State, action: Interfaces.Recipes) => ({
      ...state,
      recipes: [...action.recipes]
    })),
    on(RecipeActions.updateRecipe, (state: State, action: Interfaces.UpdateRecipe) => ({
      ...state,
      recipes: state.recipes.map((recipe, index) => index === action.index ? { ...action.recipe } : recipe)
    }))
  )(recipeState, recipeAction);
}
