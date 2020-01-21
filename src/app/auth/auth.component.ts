import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm }                       from '@angular/forms';
import { Store }                        from '@ngrx/store';
import { Subscription }                 from 'rxjs';

import * as fromApp     from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector   : 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls  : ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  private storeSub: Subscription;
  isLoading     = false;
  error: string = null;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.isLoading;
      this.error     = authState.authError;
    });
  }

  ngOnDestroy(): void {
    if (this.store != null) {
      this.storeSub.unsubscribe();
    }
  }
}
