import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-list',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './country-list.html',
  styles: ``,
})
export class CountryList {
  countries = input.required<Country[]>();

  errorMessage = input<Error | undefined>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
}
