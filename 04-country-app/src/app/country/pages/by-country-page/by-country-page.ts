import {
  Component,
  inject,
  linkedSignal,
  resource,
  signal,
} from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryList],
  templateUrl: './by-country-page.html',
  styles: ``,
})
export class ByCountryPage {
  private countryService = inject(CountryService);

  activateRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activateRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource({
    params: () => ({
      query: this.query(),
    }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      this.router.navigate(['country/by-country'], {
        queryParams: { query: params.query },
      });

      return this.countryService.searchByName(params.query);
    },
  });

  // countryResource = resource({
  //   params: () => ({
  //     query: this.query(),
  //   }),
  //   loader: async ({ params }) => {
  //     if (!params.query) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByName(params.query)
  //     );
  //   },
  // });

  // onSearch(value: string) {
  //   console.log('Searching for country:', value);
  // }
}
