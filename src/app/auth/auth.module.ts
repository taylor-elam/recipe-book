import { NgModule }    from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule }      from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent }     from './auth.component';
import { AuthFormComponent } from './auth-form/auth-form.component';

@NgModule({
  declarations: [
    AuthComponent,
    AuthFormComponent,
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
