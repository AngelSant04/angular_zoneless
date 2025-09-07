import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFound } from "../../../shared/components/not-found/not-found";
import { CountryInformation } from "./country-information/country-information";

@Component({
  selector: 'app-country-page',
  imports: [NotFound, CountryInformation],
  templateUrl: './country-page.html',
  styles: ``,
})
export class CountryPage {
  countryCode = inject(ActivatedRoute).snapshot.paramMap.get('code') || '';
  countryService = inject(CountryService);

  countryResource = rxResource({
    params: () => ({
      code: this.countryCode,
    }),
    stream: ({ params }) =>
      this.countryService.searchCountryByAlphaCode(params.code),
  });
}
