import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  // template: `
  //   <h1>Hola Mundo: {{ counter }}</h1>
  //   <button (click)="increaseBy(1)">+1</button>
  //   <button (click)="reset(10)">Reset</button>
  //   <button (click)="decreaseBy(1)">+1</button>
  // `,
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterPageComponent {
  counter = 10;

  counterSignal = signal(10);

  // constructor() {
  //   setInterval(() => {
  //     // this.counter += 1;
  //     this.counterSignal.update((current) => current + 1);
  //     // console.log(this.counter);
  //     console.log(this.counterSignal());
  //     console.log('tick');
  //   }, 2000);
  // }

  increaseBy(value: number) {
    this.counter += value;
    this.counterSignal.update((current) => current + value);
  }
  reset(value: number) {
    this.counter = 10;
    this.counterSignal.set(10);
  }
  decreaseBy(value: number) {
    this.counter -= value;
    this.counterSignal.update((current) => current - value);
  }
}
