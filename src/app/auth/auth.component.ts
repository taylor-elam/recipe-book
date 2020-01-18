import { Component }  from '@angular/core';
import { NgForm }     from '@angular/forms';
import { Router }     from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router) { }

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
        this.isLoading = false;
        this.router.navigate(['/recipes']);
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