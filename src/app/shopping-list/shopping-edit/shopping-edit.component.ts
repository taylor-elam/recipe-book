import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm }                                  from '@angular/forms';
import { Subscription }                            from 'rxjs';

import { Ingredient }          from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector   : 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls  : ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) shoppingListForm: NgForm;
  editedItem: Ingredient;
  index: number;
  subscription: Subscription;
  isEditMode = false;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.isEditMode = true;
          this.index      = index;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.shoppingListForm.setValue({
            name  : this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }

  onSubmit(form: NgForm): void {
    const value         = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.isEditMode) {
      this.shoppingListService.updateIngredient(this.index, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.isEditMode = false;
    form.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
