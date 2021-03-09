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
  private _api_url: string = environment.api_url;

  get heroes(): Hero[] {
    return [...this._heroes];
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
}
