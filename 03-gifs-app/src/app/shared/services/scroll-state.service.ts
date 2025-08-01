import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollStateService {
  private scrollPosition = signal(0);

  setScrollPosition(position: number): void {
    this.scrollPosition.set(position);
  }

  getScrollPosition(): number {
    return this.scrollPosition();
  }
}
