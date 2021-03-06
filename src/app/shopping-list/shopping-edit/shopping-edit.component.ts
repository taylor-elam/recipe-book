import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm }                                  from '@angular/forms';
import { Store }                                   from '@ngrx/store';
import { Subscription }                            from 'rxjs';

import { Ingredient }           from '../../shared/ingredient.model';
import * as fromApp             from '../../store/app.reducer';
import * as ShoppingListActions from '../store/shopping-list.actions';

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

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe(stateData => {
          const index = stateData.editedIngredientIndex;
          if (stateData.editedIngredientIndex > -1) {
            this.editedItem = stateData.ingredients[index];
            this.isEditMode = true;
            this.shoppingListForm.setValue({
              name  : this.editedItem.name,
              amount: this.editedItem.amount
            });
          } else {
            this.isEditMode = false;
          }
        }
      );
  }

  onClear(): void {
    this.isEditMode = false;
    this.shoppingListForm.reset();
    this.store.dispatch(ShoppingListActions.stopEdit());
  }

  onSubmit(form: NgForm): void {
    const value         = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.isEditMode === true) {
      this.store.dispatch(ShoppingListActions.updateIngredient({ ingredient: newIngredient }));
    } else {
      this.store.dispatch(ShoppingListActions.addIngredient({ ingredient: newIngredient }));
    }

    this.onClear();
    this.isEditMode = false;
    form.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(ShoppingListActions.stopEdit());
  }
}
