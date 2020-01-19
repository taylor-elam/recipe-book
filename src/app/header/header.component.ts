import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store }                        from '@ngrx/store';
import { Subscription }                 from 'rxjs';
import { map }                          from 'rxjs/operators';

import { AuthService }        from '../auth/auth.service';
import * as AuthActions       from '../auth/store/auth.actions';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp           from '../store/app.reducer';

@Component({
  selector   : 'app-header',
  templateUrl: './header.component.html',
  styleUrls  : ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  collapsed       = true;

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = user != null;
      });
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
