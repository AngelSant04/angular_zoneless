import {
  Component,
  input,
  // Input,
  // signal
} from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-list',
  templateUrl: './character-list.component.html',
})
export class CharacterListComponent {
  // @Input() characters = signal<Character[]>([]);
  characters = input.required<Character[]>();
  listName = input.required<string>();
}
