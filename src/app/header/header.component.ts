import { Component }          from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector   : 'app-header',
  templateUrl: './header.component.html',
  styleUrls  : ['./header.component.scss']
})
export class HeaderComponent {
  collapsed = true;

  constructor(private dataStorageService: DataStorageService) { }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes();
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }
}
