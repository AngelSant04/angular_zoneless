import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-numbers-page',
  imports: [DecimalPipe, CurrencyPipe, PercentPipe],
  templateUrl: './numbers-page.html',
  styles: ``
})
export default class NumbersPage {
totalSells = signal(2_433_232.5567);
  percent = signal(0.4856);
}
