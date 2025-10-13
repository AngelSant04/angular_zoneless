import { Pipe, PipeTransform } from '@angular/core';

type ResponsePipe = 'Puede volar' | 'No puede volar';

@Pipe({
  name: 'canFly',
})
export class CanFlyPipe implements PipeTransform {
  transform(value: boolean): ResponsePipe {
    return value ? 'Puede volar' : 'No puede volar';
  }
}
