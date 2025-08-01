import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifService } from '@app/gifs/services/gifs.service';
import { GifList } from "@app/gifs/components/gif-list/gif-list";

@Component({
  selector: 'app-gif-history',
  imports: [GifList],
  templateUrl: './gif-history.html',
})
export default class GifHistory {
  gifsService = inject(GifService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map((params) => params['query'] ?? 'defaultQuery')
    )
  );

  gifsByKey = computed(() => this.gifsService.getHistoryGifs(this.query()));
}
