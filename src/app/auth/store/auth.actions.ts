import { Action } from '@ngrx/store';

export const AUTH_SUCCESS  = '[Auth] Login Success';
export const AUTH_FAILURE  = '[Auth] Auth Failure';
export const AUTO_LOGIN    = '[Auth] Auto Login';
export const CLEAR_ERROR   = '[Auth] Clear Error';
export const LOGIN_START   = '[Auth] Login Start';
export const LOGOUT        = '[Auth] Logout';
export const SIGN_UP_START = '[Auth] Sign Up Start';

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(public payload: {
    email: string,
    userId: string,
    token: string,
    expirationDate: Date,
    redirect: boolean
  }) {}
}

export class AuthFailure implements Action {
  readonly type = AUTH_FAILURE;

  constructor(public payload: string) {}
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string, password: string }) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SignUpStart implements Action {
  readonly type = SIGN_UP_START;

  constructor(public payload: { email: string, password: string }) {}
}

export type AuthActions =
  | AuthSuccess
  | AuthFailure
  | AutoLogin
  | ClearError
  | LoginStart
  | Logout
  | SignUpStart;
