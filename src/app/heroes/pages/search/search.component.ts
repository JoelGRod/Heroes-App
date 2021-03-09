import { Component, OnInit } from '@angular/core';
// Interfaces
import { Hero } from '../../interfaces/heroes.interface';
// Services
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  public term: string = '';
  // public heroes: Hero[] = [];

  get heroes(): Hero[] {
    return this.heroes_service.heroes;
  }

  constructor( private heroes_service: HeroesService ) { }

  ngOnInit(): void {
  }
  
  searching(): void {
    this.heroes_service.get_heroes();
  }

}
