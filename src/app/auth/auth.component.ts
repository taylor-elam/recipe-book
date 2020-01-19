import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm }                       from '@angular/forms';
import { Router }            from '@angular/router';
import { Store }             from '@ngrx/store';
import { Subscription }      from 'rxjs';

import { AuthService }  from './auth.service';
import * as fromApp     from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector   : 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls  : ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  private storeSub: Subscription;
  isLoading     = false;
  isLoginMode   = true;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.isLoading;
      this.error     = authState.authError;
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid === false) {
      return;
    }

    const email    = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.ClearError());

    if (this.isLoginMode === true) {
      this.store.dispatch(new AuthActions.LoginStart({ email, password }));
    } else {
      this.store.dispatch(new AuthActions.SignUpStart({ email, password }));
    }

    form.reset();
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnDestroy(): void {
    if (this.store != null) {
      this.storeSub.unsubscribe();
    }
  }
}
