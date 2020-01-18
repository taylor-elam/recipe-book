import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent }          from './auth/auth.component';
import { AuthGuard }              from './auth/auth.guard';
import { ShoppingListComponent }  from './shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
