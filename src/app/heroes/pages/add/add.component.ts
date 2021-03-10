import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// RXJS
import { switchMap } from 'rxjs/operators';
// Interfaces
import { Hero, Publisher } from '../../interfaces/heroes.interface';
// Services
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
    .hero-img {
      width: 100%;
      border-radius: 5px;
    }
    `
  ]
})
export class AddComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  hero: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
    id: ''
  }

  constructor(private activated_route: ActivatedRoute,
              private heroes_service: HeroesService,
              private router: Router) { }

  ngOnInit(): void {
    this.activated_route.params
    .pipe(switchMap(({id}) => this.heroes_service.get_heroe(id)))
    .subscribe( (hero: Hero) => this.hero = hero );
  }

  save_hero() {
    if(this.hero.superhero.trim().length === 0) return;

    if(this.hero.id === '') {
      this.heroes_service.add_hero(this.hero).subscribe(
        (hero: Hero) => this.router.navigate(['/heroes/edit', hero.id])
      );
    } else {
      this.heroes_service.modify_hero(this.hero).subscribe(
        (hero: Hero) => console.log('Hero modified...')
      );
    }
  }

}
