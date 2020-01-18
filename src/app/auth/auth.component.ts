import { Component }  from '@angular/core';
import { NgForm }     from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector   : 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls  : ['./auth.component.scss']
})
export class AuthComponent {
  isLoading     = false;
  isLoginMode   = true;
  error: string = null;

  constructor(private authService: AuthService) { }

  onSubmit(form: NgForm): void {
    if (form.valid === false) {
      return;
    }

    const email    = form.value.email;
    const password = form.value.password;
    this.error     = null;
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode === true) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
      },
      errorMessage => {
        this.error     = errorMessage;
        this.isLoading = false;
      });

    form.reset();
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }
}
