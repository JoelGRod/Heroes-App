import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
// Interfaces
import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent implements OnInit {

  get heroes(): Hero[] {
    return this.heroes_service.heroes;
  }

  constructor(private heroes_service: HeroesService) { }

  ngOnInit(): void {
    this.heroes_service.get_heroes();
  }

}
