import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Interfaces
import { Hero } from '../../interfaces/heroes.interface';
// rxjs
import {switchMap} from 'rxjs/operators';
// Services
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
    .hero-img {
      width: 100%;
      border-radius: 5px;
    }

    .hero-button {
      margin-left: 1rem;
    }
    `
  ]
})
export class HeroeComponent implements OnInit {

  public specific_hero!: Hero;

  constructor(private activated_route: ActivatedRoute, 
              private heroes_service: HeroesService,
              private router: Router) { }

  ngOnInit(): void {
    this.activated_route.params
    .pipe(
      switchMap( ({id}) => this.heroes_service.get_heroe(id) )
    )
    .subscribe(
      (hero: Hero) => this.specific_hero = hero
    )
  }

  go_back() {
    this.router.navigate(['/heroes/list']);
  }

}
