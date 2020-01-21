import { Component, OnDestroy, OnInit }   from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators
}                                         from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store }                          from '@ngrx/store';
import { Subscription }                   from 'rxjs';
import { map }                            from 'rxjs/operators';

import * as fromApp       from '../../store/app.reducer';
import { Recipe }         from '../recipe.model';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector   : 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls  : ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private storeSub: Subscription;
  id: number;
  recipeForm: FormGroup;
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.id         = +params.id;
        this.isEditMode = params.id != null;
        this.initForm();
      });
  }

  private initForm(): void {
    let recipeDescription   = '';
    let recipeImagePath     = '';
    let recipeName          = '';
    const recipeIngredients = new FormArray([]);

    if (this.isEditMode === true) {
      this.storeSub = this.store
        .select('recipes')
        .pipe(
          map(recipeState => {
            return recipeState.recipes.find((recipe: Recipe, index: number) => {
              return index === this.id;
            });
          })
        )
        .subscribe((recipe: Recipe) => {
          recipeDescription = recipe.description;
          recipeImagePath   = recipe.imagePath;
          recipeName        = recipe.name;

          if (recipe.ingredients) {
            for (const ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name  : new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*(\.[0-9]+)?|0\.[0-9]+$/)
                  ])
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      name       : new FormControl(recipeName, Validators.required),
      imagePath  : new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }

  get controls(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name  : new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*(\.[0-9]+)?|0\.[0-9]+$/)
        ])
      })
    );
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onSubmit(): void {
    if (this.isEditMode === true) {
      this.store.dispatch(RecipeActions.updateRecipe({ index: this.id, recipe: this.recipeForm.value }));
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.store.dispatch(RecipeActions.addRecipe({recipe: this.recipeForm.value}));
    }
  }

  ngOnDestroy(): void {
    if (this.storeSub != null) {
      this.storeSub.unsubscribe();
    }
  }
}
