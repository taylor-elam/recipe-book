import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';

import { AppRoutingModule }      from './app-routing.module';
import { AppComponent }          from './app.component';
import { HeaderComponent }       from './header/header.component';
import { RecipeComponent }       from './recipe/recipe.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeListComponent }   from './recipe/recipe-list/recipe-list.component';
import { RecipeItemComponent }   from './recipe/recipe-list/recipe-item/recipe-item.component';
import { DropdownDirective }     from './shared/dropdown.directive';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListService }   from './shopping-list/shopping-list.service';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';

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
    RecipeEditComponent
  ],
  imports     : [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers   : [
    ShoppingListService
  ],
  bootstrap   : [AppComponent]
})
export class AppModule {}
