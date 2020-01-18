import { Component, OnInit }                                              from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router }                                 from '@angular/router';

import { RecipeService } from '../recipe.service';

@Component({
  selector   : 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls  : ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  recipeForm: FormGroup;
  isEditMode = false;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id         = +params.id;
          this.isEditMode = params.id != null;
          this.initForm();
        }
      );
  }

  private initForm(): void {
    let recipeDescription   = '';
    let recipeImagePath     = '';
    const recipeIngredients = new FormArray([]);
    let recipeName          = '';

    if (this.isEditMode === true) {
      const recipe      = this.recipeService.getRecipe(this.id);
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
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
  }
}
