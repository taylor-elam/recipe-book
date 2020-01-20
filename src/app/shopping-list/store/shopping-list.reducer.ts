import { Action, createReducer, on } from '@ngrx/store';
import { Ingredient }                from '../../shared/ingredient.model';
import * as ShoppingListActions      from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients          : [
    new Ingredient('Apples', 10),
    new Ingredient('Tomatoes', 5)
  ],
  editedIngredientIndex: -1
};

export function shoppingListReducer(shoppingListState: State | undefined, shoppingListAction: Action): State {
  return createReducer(
    initialState,
    on(ShoppingListActions.addIngredient, (state: State, action: { ingredient: Ingredient }) => ({
      ...state,
      ingredients: state.ingredients.concat(action.ingredient)
    })),
    on(ShoppingListActions.addIngredients, (state: State, action: { ingredients: Ingredient[] }) => ({
      ...state,
      ingredients: state.ingredients.concat(...action.ingredients)
    })),
    on(ShoppingListActions.deleteIngredient, (state: State) => ({
      ...state,
      editedIngredientIndex: -1,
      ingredients          : state.ingredients.filter((ingredient, index) => index !== state.editedIngredientIndex)
    })),
    on(ShoppingListActions.startEdit, (state: State, action: { index: number }) => ({
      ...state,
      editedIngredientIndex: action.index
    })),
    on(ShoppingListActions.stopEdit, (state: State) => ({
      ...state,
      editedIngredientIndex: -1
    })),
    on(ShoppingListActions.updateIngredient, (state: State, action: { ingredient: Ingredient }) => ({
      ...state,
      editIndex  : -1,
      ingredients: state.ingredients.map((ingredient, index) => {
        return index === state.editedIngredientIndex ? { ...action.ingredient } : ingredient;
      })
    }))
  )(shoppingListState, shoppingListAction);
}
