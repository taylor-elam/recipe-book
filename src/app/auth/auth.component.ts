import { Component } from '@angular/core';
import { NgForm }    from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
  selector   : 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls  : ['./auth.component.scss']
})
export class AuthComponent {
  isLoginMode = true;

  constructor(private authService: AuthService) { }

  onSubmit(form: NgForm) {
    if (form.valid === false) {
      return;
    }

    if (this.isLoginMode === true) {

    } else {
      const email    = form.value.email;
      const password = form.value.password;
      this.authService.signUp(email, password).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
    }

    form.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
