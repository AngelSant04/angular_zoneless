import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './dynamic-page.html',
  styles: ``
})
export class DynamicPage {
  private fb = inject(FormBuilder)
  formUtils = FormUtils

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Uncharted', Validators.required],
    ], [Validators.minLength(2), Validators.required]),
  })

  newFavorite = new FormControl('', Validators.required)
  // newFavorite = this.fb.control(['', Validators.required])

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites() {
    if (this.newFavorite.invalid) return

    const newGame = this.newFavorite.value

    this.favoriteGames.push(this.fb.control(newGame, Validators.required))

    this.newFavorite.reset()
  }

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index)
  }

  onSubmit() {
    this.myForm.markAllAsTouched()
  }

}
