import { Pipe, PipeTransform } from '@angular/core';
// Interfaces
import { Hero } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imageHero'
})
export class ImageHeroPipe implements PipeTransform {

  transform(hero: Hero): string {

    if( !hero.id ) {
      return 'assets/no-image.png';
    } else if( hero.id && hero.alt_img) {
      return hero.alt_img;
    } else {
      return `assets/heroes/${hero.id}.jpg`;
    } 

  }

}
