import {Component} from '@angular/core';
import {NgForm}    from '@angular/forms';

@Component({
  selector:    'app-auth',
  templateUrl: './auth.component.html',
  styleUrls:   ['./auth.component.scss']
})
export class AuthComponent {
  isLoginMode = true;

  constructor() { }

  onSubmit(form: NgForm) {
    console.log(form.value);
    form.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
