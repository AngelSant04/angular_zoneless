import { Component, inject, signal } from '@angular/core';
import { GifList } from '@app/gifs/components/gif-list/gif-list';
import { Gif } from '@app/gifs/interfaces/gif.interface';
import { GifService } from '@app/gifs/services/gifs.service';

@Component({
  selector: 'app-search-page',
  imports: [GifList],
  templateUrl: './search-page.html',
})
export default class SearchPage {
  gifService = inject(GifService);
  gifs = signal<Gif[]>([]);

  onSearch(query: string) {
    this.gifService.searchGifs(query).subscribe((response) => {
      this.gifs.set(response);
    });
  }
}
