import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '@environments/environment';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { GiphyResponse } from '../interfaces/giphy.interfaces';

function loadFromLocalStorage(): Record<string, Gif[]> {
  const searchHistory = localStorage.getItem('searchHistory');
  return searchHistory ? JSON.parse(searchHistory) : {};
}

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(false);
  private trendingPage = signal(0);

  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let index = 0; index < this.trendingGifs().length; index += 3) {
      groups.push(this.trendingGifs().slice(index, index + 3));
    }
    return groups;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  saveToLocalStorage = effect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory()));
  });

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs(): void {
    if (this.trendingGifsLoading()) return;
    this.trendingGifsLoading.set(true);
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: '20',
          offset: this.trendingPage() * 20,
        },
      })
      .subscribe((res) => {
        const gifs = GifMapper.mapGiphyItemsToGifsArray(res.data);
        this.trendingGifs.update((currentGifs) => [...currentGifs, ...gifs]);
        this.trendingGifsLoading.set(false);
        this.trendingPage.update((page) => page + 1);
      });
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          q: query,
          limit: '20',
        },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifsArray(items)),
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLocaleLowerCase()]: items,
          }));
        })
      );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
