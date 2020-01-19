import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router }     from '@angular/router';
import { Store }      from '@ngrx/store';

import * as fromApp     from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { User }         from './user.model';

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
      this.store.dispatch(new AuthActions.AuthSuccess({
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

    if (this.tokenExpirationTimer != null) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    // const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    // const user           = new User(email, userId, token, expirationDate);
    // this.store.dispatch(new AuthActions.AuthSuccess({ email, userId, token, expirationDate }));
    this.autoLogout(expiresIn * 1000);
    // localStorage.setItem('userData', JSON.stringify(user));
  }
}
