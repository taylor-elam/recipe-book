import { Component } from '@angular/core';
import { NgForm }    from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
  selector   : 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls  : ['./auth.component.scss']
})
export class AuthComponent {
  isLoading   = false;
  isLoginMode = true;

  constructor(private authService: AuthService) { }

  onSubmit(form: NgForm) {
    if (form.valid === false) {
      return;
    }

    const email    = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    if (this.isLoginMode === true) {

    } else {
      this.authService.signUp(email, password).subscribe(
        response => {
          console.log(response);
          this.isLoading = false;
        },
        error => {
          console.log(error);
          this.isLoading = false;
        });
    }

    form.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
