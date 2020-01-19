import { HttpClientModule } from '@angular/common/http';
import { FormsModule }      from '@angular/forms';
import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';

import { AppRoutingModule }   from './app-routing.module';
import { AppComponent }       from './app.component';
import { AuthModule }         from './auth/auth.module';
import { CoreModule }         from './core.module';
import { HeaderComponent }    from './header/header.component';
import { RecipeModule }       from './recipe/recipe.module';
import { SharedModule }       from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

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
    AuthModule,
    CoreModule,
    RecipeModule,
    SharedModule,
    ShoppingListModule,
  ],
  bootstrap   : [AppComponent]
})
export class AppModule {}
