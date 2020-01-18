import { CommonModule } from '@angular/common';
import { NgModule }     from '@angular/core';
import { FormsModule }  from '@angular/forms';

import { ShoppingEditComponent }     from './shopping-edit/shopping-edit.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent }     from './shopping-list.component';

@NgModule({
  declarations: [
    ShoppingEditComponent,
    ShoppingListComponent,
  ],
  imports     : [
    CommonModule,
    FormsModule,
    ShoppingListRoutingModule
  ],
  exports     : [
    ShoppingEditComponent,
    ShoppingListComponent,
  ]
})
export class ShoppingListModule {}
