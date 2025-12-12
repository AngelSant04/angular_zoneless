import { Component, input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.html',
  styles: ``,
})
export class Title {
  title = input.required<string>();

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges');

    console.log(changes);
  }
}
