import { Pipe, PipeTransform } from '@angular/core';
// Interfaces
import { Hero } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imageHero'
})
export class ImageHeroPipe implements PipeTransform {

  transform(hero: Hero): string {
    return `assets/heroes/${hero.id}.jpg`;
  }

}
