import { HttpClient }                      from '@angular/common/http';
import { Injectable }                      from '@angular/core';
import { Router }                          from '@angular/router';
import { Actions, Effect, ofType }         from '@ngrx/effects';
import { of }                              from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { environment }      from '../../../environments/environment';
import { AuthResponseData } from '../auth.service';
import * as AuthActions     from './auth.actions';

const LOGIN_URI   = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(LOGIN_URI + environment.firebaseAPIKey,
        {
          email            : authData.payload.email,
          password         : authData.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        map(response => {
          const expirationDate = new Date(new Date().getTime() + (+response.expiresIn * 1000));
          return new AuthActions.LoginSuccess({
            email : response.email,
            userId: response.localId,
            token : response.idToken,
            expirationDate
          });
        }),
        catchError(errorResponse => {
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

          return of(new AuthActions.LoginFail(errorMessage));
        })
      );
    })
  );

  @Effect({dispatch: false})
  authLoginSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    })
  );
}
