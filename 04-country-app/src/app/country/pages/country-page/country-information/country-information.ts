import { Component, computed, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'country-information-page',
  imports: [CommonModule],
  templateUrl: './country-information.html',
  styleUrl: './country-information.css',
})
export class CountryInformation {
  country = input.required<Country>();

  currentYear = computed(() => new Date().getFullYear());
}
