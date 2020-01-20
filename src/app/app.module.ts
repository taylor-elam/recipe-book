import { HttpClientModule }            from '@angular/common/http';
import { FormsModule }                 from '@angular/forms';
import { BrowserModule }               from '@angular/platform-browser';
import { NgModule }                    from '@angular/core';
import { EffectsModule }               from '@ngrx/effects';
import { StoreModule }                 from '@ngrx/store';
import { StoreDevtoolsModule }         from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment }      from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent }     from './app.component';
import { AuthEffects }      from './auth/store/auth.effects';
import { CoreModule }       from './core.module';
import { HeaderComponent }  from './header/header.component';
import { SharedModule }     from './shared/shared.module';
import * as fromApp         from './store/app.reducer';

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
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    CoreModule,
    SharedModule,
  ],
  bootstrap   : [AppComponent]
})
export class AppModule {}
