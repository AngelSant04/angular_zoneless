import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  // signal,
  viewChild,
} from '@angular/core';
// import { GifList } from '@app/gifs/components/gif-list/gif-list';
import { GifService } from '@app/gifs/services/gifs.service';
import { ScrollStateService } from '@app/shared/services/scroll-state.service';

// export const imageUrls: string[] = [
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg',
//   'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg',
// ];
@Component({
  selector: 'app-trending-page',
  // imports: [GifList],
  templateUrl: './trending-page.html',
})
export default class TrendingPage implements AfterViewInit {
  // gifs = signal(imageUrls);

  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);

  scroolDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  onScroll(event: Event): void {
    const scroolDiv = this.scroolDivRef()?.nativeElement;
    if (!scroolDiv) return;

    const scroolTop = scroolDiv.scrollTop;
    const clientHeight = scroolDiv.clientHeight;
    const scrollHeight = scroolDiv.scrollHeight;

    const isAtBottom = scroolTop + clientHeight + 300 >= scrollHeight;

    this.scrollStateService.setScrollPosition(scroolTop);
    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
  }

  ngAfterViewInit(): void {
    const scroolDiv = this.scroolDivRef()?.nativeElement;
    if (!scroolDiv) return;
    scroolDiv.scrollTop = this.scrollStateService.getScrollPosition();
  }
}
