import { Component } from '@angular/core';
import { NgForm }    from '@angular/forms';

import { AuthService } from './auth.service';

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

  onSubmit(form: NgForm) {
    if (form.valid === false) {
      return;
    }

    const email    = form.value.email;
    const password = form.value.password;
    this.error     = null;
    this.isLoading = true;

    if (this.isLoginMode === true) {
      this.isLoading = false;
    } else {
      this.authService.signUp(email, password).subscribe(
        response => {
          console.log(response);
          this.isLoading = false;
        },
        errorMessage => {
          this.error     = errorMessage;
          this.isLoading = false;
        });
    }

    form.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
