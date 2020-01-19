import { ActionReducerMap }  from '@ngrx/store';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth         from '../auth/store/auth.reducer';

export interface AppState {
  auth: fromAuth.State;
  shoppingList: fromShoppingList.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth        : fromAuth.authReducer,
  shoppingList: fromShoppingList.shoppingListReducer
};
