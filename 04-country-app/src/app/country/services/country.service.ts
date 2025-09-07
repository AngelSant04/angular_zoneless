import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  catchError,
  count,
  delay,
  map,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { TypeSearch } from '../interfaces/type-search.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheCode = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();

  private fetchCountries(
    url: string,
    tipo: TypeSearch,
    query: string
  ): Observable<Country[]> {
    return this.http.get<RESTCountry[]>(url).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
      ),
      tap((countries) => {
        switch (tipo) {
          case 'capital':
            this.queryCacheCapital.set(query, countries);
            break;
          case 'country':
            this.queryCacheCountry.set(query, countries);
            break;
          case 'code':
            this.queryCacheCode.set(query, countries);
            break;
          case 'region':
            this.queryCacheRegion.set(query, countries);
            break;
        }
      }),
      catchError((err: unknown) => {
        console.error(`Error fetching countries for ${tipo}:`, err);
        return throwError(
          () => new Error(`Error fetching countries for ${tipo}`)
        );
      })
    );
  }

  private getFromCache(query: string, tipo: TypeSearch): Country[] | undefined {
    switch (tipo) {
      case 'capital':
        return this.queryCacheCapital.get(query);
      case 'country':
        return this.queryCacheCountry.get(query);
      case 'code':
        return this.queryCacheCode.get(query);
      case 'region':
        return this.queryCacheRegion.get(query);
      default:
        return undefined;
    }
  }

  searchByCapital(query: string): Observable<Country[]> {
    const cached = this.getFromCache(query, 'capital');
    if (cached) return of(cached);

    return this.fetchCountries(
      `${API_URL}/capital/${query.toLowerCase()}`,
      'capital',
      query
    );
  }

  searchByName(query: string): Observable<Country[]> {
    const cached = this.getFromCache(query, 'country');
    if (cached) return of(cached);

    return this.fetchCountries(
      `${API_URL}/name/${query.toLowerCase()}`,
      'country',
      query
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | undefined> {
    const cached = this.getFromCache(code, 'code');
    if (cached) return of(cached[0]);

    return this.fetchCountries(
      `${API_URL}/alpha/${code.toLowerCase()}`,
      'code',
      code
    ).pipe(map((countries) => countries.at(0)));
  }

  searchByRegion(region: string): Observable<Country[]> {
    const cached = this.getFromCache(region, 'region');
    if (cached) return of(cached);

    return this.fetchCountries(
      `${API_URL}/region/${region.toLowerCase()}`,
      'region',
      region
    );
  }
}
