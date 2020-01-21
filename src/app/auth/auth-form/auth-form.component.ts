import { Component, Input } from '@angular/core';
import { NgForm }           from '@angular/forms';
import { Store }            from '@ngrx/store';

import { REGEX }        from '../../shared/RegEx';
import * as fromApp     from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector   : 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls  : ['./auth-form.component.scss']
})
export class AuthFormComponent {
  @Input() isLoginMode: boolean;

  constructor(private regex: REGEX, private store: Store<fromApp.AppState>) { }

  isFormValid(form: NgForm): boolean {
    if (this.isLoginMode) {
      return form.valid;
    } else {
      return form.valid &&
        this.regex.ONE_UPPERCASE.test(form.value.password) &&
        this.regex.ONE_LOWERCASE.test(form.value.password) &&
        this.regex.ONE_NUMBER.test(form.value.password) &&
        this.regex.ONE_SYMBOL.test(form.value.password) &&
        form.value.password === form.value.passwordConf;
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid === false) {
      return;
    }

    const email    = form.value.email;
    const password = form.value.password;
    this.store.dispatch(AuthActions.clearError());

    if (this.isLoginMode === true) {
      this.store.dispatch(AuthActions.loginStart({ email, password }));
    } else {
      this.store.dispatch(AuthActions.signUpStart({ email, password }));
    }

    form.reset();
  }
}
