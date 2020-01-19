import { CommonModule }            from '@angular/common';
import { NgModule }                from '@angular/core';
import { DropdownDirective }       from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    DropdownDirective,
    LoadingSpinnerComponent,
  ],
  imports     : [
    CommonModule
  ],
  exports     : [
    CommonModule,
    DropdownDirective,
    LoadingSpinnerComponent,
  ]
})
export class SharedModule {}
