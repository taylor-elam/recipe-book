import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription }                 from 'rxjs';
import { AuthService }                  from '../auth/auth.service';
import { DataStorageService }           from '../shared/data-storage.service';

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
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = user != null;
    });
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(): void {
    this.authService.logout();
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
