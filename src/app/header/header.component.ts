import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store }                        from '@ngrx/store';
import { Subscription }                 from 'rxjs';
import { map }                          from 'rxjs/operators';

import * as AuthActions   from '../auth/store/auth.actions';
import * as RecipeActions from '../recipe/store/recipe.actions';
import * as fromApp       from '../store/app.reducer';

@Component({
  selector   : 'app-header',
  templateUrl: './header.component.html',
  styleUrls  : ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  collapsed       = true;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = user != null;
      });
  }

  onFetchData(): void {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }

  onSaveData(): void {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
