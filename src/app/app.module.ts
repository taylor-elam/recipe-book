import { HttpClientModule } from '@angular/common/http';
import { FormsModule }      from '@angular/forms';
import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }     from './app.component';
import { CoreModule }       from './core.module';
import { HeaderComponent }  from './header/header.component';
import { SharedModule }     from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports     : [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
  ],
  bootstrap   : [AppComponent]
})
export class AppModule {}
