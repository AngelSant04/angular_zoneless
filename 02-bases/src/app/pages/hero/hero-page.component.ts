import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './hero-page.component.html',
  imports: [CommonModule],
})
export class HeroPageComponent {
  name = signal('Ironman');
  age = signal(45);

  herDescription = computed(() => {
    const description = `${this.name()} - ${this.age()}`;
    return description;
  });

  //   getHeroDescription(): string {
  //     return `${this.name()} - ${this.age()}`;
  //   }

  changeHero(): void {
    this.name.set('Spiderman');
    this.age.set(22);
  }

  resetForm(): void {
    this.name.set('Ironman');
    this.age.set(45);
  }

  changeAge(age: number): void {
    this.age.set(age);
  }
}
