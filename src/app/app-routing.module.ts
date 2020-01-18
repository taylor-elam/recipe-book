import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent }          from './auth/auth.component';
import { AuthGuard }              from './auth/auth.guard';
import { RecipeDetailComponent }  from './recipe/recipe-detail/recipe-detail.component';
import { RecipeEditComponent }    from './recipe/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipe/recipe-resolver.service';
import { RecipeStartComponent }   from './recipe/recipe-start/recipe-start.component';
import { RecipeComponent }        from './recipe/recipe.component';
import { ShoppingListComponent }  from './shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  {
    path: 'recipes', component: RecipeComponent, canActivate: [AuthGuard], children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
