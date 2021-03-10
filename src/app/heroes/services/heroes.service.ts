import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Interfaces
import { Hero } from '../interfaces/heroes.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private _heroes: Hero[] = [];
  private _suggestions: Hero[] = [];
  private _last_added_hero!: Hero;
  private _api_url: string = environment.api_url;

  get heroes(): Hero[] {
    return [...this._heroes];
  }

  get suggestions(): Hero[] {
    return [...this._suggestions];
  }

  get last_added_hero(): Hero {
    return {...this._last_added_hero};
  }

  constructor(private http: HttpClient) { }

  get_heroes(): void {
    this.http.get<Hero[]>(`${this._api_url}/heroes`).subscribe(
      heroes => this._heroes = heroes 
    )
  }

  // Return observable (switchmap test)
  get_heroe(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this._api_url}/heroes/${id}`);
  }

  get_heroes_suggestion(term: string): void {
    this.http.get<Hero[]>(`${this._api_url}/heroes/?q=${term}&_limit=6`).subscribe(
      heroes => this._suggestions = heroes
    );
  }

  add_hero(hero: Hero): void {
    this.http.post<Hero>(`${this._api_url}/heroes/`, hero).subscribe(
      resp_hero => this._last_added_hero = resp_hero 
    );
  }
}
