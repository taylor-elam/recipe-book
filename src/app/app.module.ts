import { HttpClientModule }                 from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule }                    from '@angular/platform-browser';
import { NgModule }                         from '@angular/core';

import { AppRoutingModule }      from './app-routing.module';
import { AppComponent }          from './app.component';
import { HeaderComponent }       from './header/header.component';
import { RecipeComponent }       from './recipe/recipe.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeEditComponent }   from './recipe/recipe-edit/recipe-edit.component';
import { RecipeListComponent }   from './recipe/recipe-list/recipe-list.component';
import { RecipeItemComponent }   from './recipe/recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent }  from './recipe/recipe-start/recipe-start.component';
import { DropdownDirective }     from './shared/dropdown.directive';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListService }   from './shopping-list/shopping-list.service';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,
    HeaderComponent,
    RecipeComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent
  ],
  imports     : [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers   : [
    ShoppingListService
  ],
  bootstrap   : [AppComponent]
})
export class AppModule {}
