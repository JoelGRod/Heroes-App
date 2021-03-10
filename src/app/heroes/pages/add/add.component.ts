import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
    .hero-img {
      width: 100%;
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

  get last_added_hero(): Hero {
    return this.heroes_service.last_added_hero;
  }

  constructor(private activated_route: ActivatedRoute,
              private heroes_service: HeroesService) { }

  ngOnInit(): void {
    this.activated_route.params.subscribe(
      ({id}) => console.log(id)
    );
  }

  save_hero() {
    if(this.hero.superhero.trim().length === 0) return;
    this.heroes_service.add_hero(this.hero);
  }

}
