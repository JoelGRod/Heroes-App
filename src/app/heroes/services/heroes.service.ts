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
  private _api_url: string = environment.api_url;

  get heroes(): Hero[] {
    return [...this._heroes];
  }

  get suggestions(): Hero[] {
    return [...this._suggestions];
  }

  constructor(private http: HttpClient) { }

  get_heroes(): void {
    this.http.get<Hero[]>(`${this._api_url}/heroes`).subscribe(
      heroes => this._heroes = heroes
    )
  }

  get_heroes_suggestion(term: string): void {
    this.http.get<Hero[]>(`${this._api_url}/heroes/?q=${term}&_limit=6`).subscribe(
      heroes => this._suggestions = heroes
    );
  }

  // Return observable (switchmap test or ts needs)
  get_heroe(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this._api_url}/heroes/${id}`);
  }

  add_hero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this._api_url}/heroes/`, hero);
  }

  modify_hero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this._api_url}/heroes/${hero.id}`, hero);
  }

  delete_hero(id: string): Observable<any> {
    return this.http.delete<any>(`${this._api_url}/heroes/${id}`);
  }
}
