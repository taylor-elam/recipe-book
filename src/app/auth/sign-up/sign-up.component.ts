import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  @Output() switchToLogin = new EventEmitter();

  constructor() { }

  onSwitchToLogin() {
    this.switchToLogin.emit();
  }
}
