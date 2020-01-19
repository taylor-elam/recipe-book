import { HttpClient, HttpErrorResponse }   from '@angular/common/http';
import { Injectable }                      from '@angular/core';
import { Router }                          from '@angular/router';
import { Actions, Effect, ofType }         from '@ngrx/effects';
import { of }                              from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { environment }      from '../../../environments/environment';
import { AuthResponseData } from '../auth.service';
import { User }             from '../user.model';
import * as AuthActions     from './auth.actions';

const LOGIN_URI   = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
const SIGN_UP_URI = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

const handleAuthentication = (email: string, userId: string, token: string, expiresIn: number) => {
  const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
  const user           = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));

  return new AuthActions.AuthSuccess({ email, userId, token, expirationDate });
};

const handleError = (errorResponse: HttpErrorResponse) => {
  let errorMessage = 'An unknown error occurred!';

  if (errorResponse.error != null && errorResponse.error.error != null) {
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email is already in use.';
        break;
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid email or password.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Too many failed attempts. Try again later.';
        break;
    }
  }

  return of(new AuthActions.AuthFailure(errorMessage));
};

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}

  @Effect()
  authAutoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return { type: '' };
      }

      const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

      if (loadedUser.token) {
        return new AuthActions.AuthSuccess({
          email         : loadedUser.email,
          userId        : loadedUser.id,
          token         : loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate)
        });
        // const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        // this.autoLogout(expirationDuration);
      }

      return { type: '' };
    })
  );

  @Effect()
  authLoginStart = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((loginAction: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(LOGIN_URI + environment.firebaseAPIKey,
        {
          email            : loginAction.payload.email,
          password         : loginAction.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        map(response => {
          return handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
        }),
        catchError(errorResponse => {
          return handleError(errorResponse);
        })
      );
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTH_SUCCESS, AuthActions.LOGOUT),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  @Effect()
  authSignUpStart = this.actions$.pipe(
    ofType(AuthActions.SIGN_UP_START),
    switchMap((signUpAction: AuthActions.SignUpStart) => {
      return this.http.post<AuthResponseData>(SIGN_UP_URI + environment.firebaseAPIKey,
        {
          email            : signUpAction.payload.email,
          password         : signUpAction.payload.email,
          returnSecureToken: true
        }
      ).pipe(
        map(response => {
          return handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
        }),
        catchError(errorResponse => {
          return handleError(errorResponse);
        })
      );
    })
  );
}
