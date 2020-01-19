import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable }                    from '@angular/core';
import { Router }                        from '@angular/router';
import { Store }                         from '@ngrx/store';
import { Observable, throwError }        from 'rxjs';
import { catchError, tap }               from 'rxjs/operators';

import { environment }  from '../../environments/environment';
import * as fromApp     from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { User }         from './user.model';

const LOGIN_URI   = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
const SIGN_UP_URI = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) { }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.store.dispatch(new AuthActions.LoginSuccess({
        email         : loadedUser.email,
        userId        : loadedUser.id,
        token         : loadedUser.token,
        expirationDate: new Date(userData._tokenExpirationDate)
      }));
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout(): void {
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer != null) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(SIGN_UP_URI + environment.firebaseAPIKey,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(response => {
        this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
      })
    );
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const user           = new User(email, userId, token, expirationDate);
    this.store.dispatch(new AuthActions.LoginSuccess({ email, userId, token, expirationDate }));
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<AuthResponseData> {
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

    return throwError(errorMessage);
  }
}
