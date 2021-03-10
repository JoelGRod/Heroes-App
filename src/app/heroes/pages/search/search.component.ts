import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
// RXJS
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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
  private _debouncer: Subject<string> = new Subject();

  selected_hero: Hero | undefined;
  
  // Autocomplete
  get suggestions(): Hero[] {
    return this.heroes_service.suggestions;
  }

  constructor( private heroes_service: HeroesService ) { }

  ngOnInit(): void {
    this._debouncer
    .pipe(debounceTime(300))
    .subscribe(
      (term: string) => this.heroes_service.get_heroes_suggestion(term) 
    );
  }
  
  searching(): void {
    this._debouncer.next(this.term.trim());
  }

  // Selected hero
  optionSelected( event: MatAutocompleteSelectedEvent ) {
    if(event.option.value === "") {
      this.selected_hero = undefined;
      return;
    }
    const hero: Hero = event.option.value;
    this.term = hero.superhero;

    this.heroes_service.get_heroe(hero.id!).subscribe(
      (hero: Hero) => this.selected_hero = hero
    );
  }

}
