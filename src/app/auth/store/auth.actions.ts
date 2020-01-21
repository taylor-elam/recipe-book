import { createAction, props } from '@ngrx/store';

import * as Interfaces from '../../shared/interfaces';

export const AUTH_SUCCESS  = '[Auth] Login Success';
export const AUTH_FAILURE  = '[Auth] Auth Failure';
export const AUTO_LOGIN    = '[Auth] Auto Login';
export const CLEAR_ERROR   = '[Auth] Clear Error';
export const LOGIN_START   = '[Auth] Login Start';
export const LOGOUT        = '[Auth] Logout';
export const SIGN_UP_START = '[Auth] Sign Up Start';

export const authFailure = createAction(AUTH_FAILURE, props<Interfaces.ErrorMessage>());
export const authSuccess = createAction(AUTH_SUCCESS, props<Interfaces.AuthData>());
export const autoLogin   = createAction(AUTO_LOGIN);
export const clearError  = createAction(CLEAR_ERROR);
export const loginStart  = createAction(LOGIN_START, props<Interfaces.AuthInfo>());
export const logout      = createAction(LOGOUT);
export const signUpStart = createAction(SIGN_UP_START, props<Interfaces.AuthInfo>());
