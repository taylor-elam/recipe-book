import { Action, createReducer, on } from '@ngrx/store';

import { User }         from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  authError: string;
  isLoading: boolean;
  user: User;
}

const initialState = {
  authError: null,
  isLoading: false,
  user     : null
};

export function authReducer(authState: State | undefined, authAction: Action): State {
  return createReducer(
    initialState,
    on(AuthActions.authFailure, (state: State, action: { errorMessage: string }) => ({
      ...state,
      authError: action.errorMessage,
      isLoading: false,
      user     : null
    })),
    on(AuthActions.authSuccess, (state: State, action: { email: string, userId: string, token: string, expirationDate: Date }) => ({
      ...state,
      authError: null,
      loading  : false,
      user     : new User(action.email, action.userId, action.token, action.expirationDate)
    })),
    on(AuthActions.clearError, (state: State) => ({ ...state, authError: null })),
    on(AuthActions.loginStart, AuthActions.signUpStart, (state: State) => ({
      ...state,
      authError: null,
      loading  : true
    })),
    on(AuthActions.logout, (state: State) => ({
      ...state,
      user: null
    }))
  )(authState, authAction);
}
