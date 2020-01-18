import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule }                         from '@angular/forms';
import { BrowserModule }                       from '@angular/platform-browser';
import { NgModule }                            from '@angular/core';

import { AppRoutingModule }        from './app-routing.module';
import { AppComponent }            from './app.component';
import { AuthInterceptorService }  from './auth/auth-interceptor.service';
import { AuthComponent }           from './auth/auth.component';
import { HeaderComponent }         from './header/header.component';
import { RecipeModule }            from './recipe/recipe.module';
import { DropdownDirective }       from './shared/dropdown.directive';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ShoppingListComponent }   from './shopping-list/shopping-list.component';
import { ShoppingEditComponent }   from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListService }     from './shopping-list/shopping-list.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DropdownDirective,
    HeaderComponent,
    LoadingSpinnerComponent,
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports     : [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RecipeModule
  ],
  providers   : [
    ShoppingListService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap   : [AppComponent]
})
export class AppModule {}
