import { Component, Input, OnInit } from '@angular/core';
import { NgForm }                   from '@angular/forms';
import { Store }                    from '@ngrx/store';
import * as fromApp                 from '../../store/app.reducer';
import * as AuthActions             from '../store/auth.actions';

@Component({
  selector   : 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls  : ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  @Input() isLoginMode: boolean;

  constructor(private store: Store<fromApp.AppState>) { }

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

  ngOnInit() { }
}
