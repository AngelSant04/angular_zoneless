import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { CharacterListComponent } from '../../components/dragonball/character-list/character-list.component';
import { CharacterAddComponent } from '../../components/dragonball/character-add/character-add.component';
import { DragonballService } from '../../services/dragonball.service';

@Component({
  imports: [CommonModule, CharacterListComponent, CharacterAddComponent],
  templateUrl: './dragonball-super-page.component.html',
  selector: 'dragonball-super',
})
export class DragonballSuperPageComponent {

  public dragonballService = inject(DragonballService);

  


}
