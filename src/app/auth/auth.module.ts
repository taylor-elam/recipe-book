import { NgModule }    from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule }      from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent }     from './auth.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { LoginComponent }    from './login/login.component';
import { SignUpComponent }   from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AuthComponent,
    AuthFormComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports     : [
    FormsModule,
    AuthRoutingModule,
    SharedModule
  ],
  exports     : [
    AuthComponent,
  ]
})
export class AuthModule {}
