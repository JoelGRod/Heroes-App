import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Interfaces
import { Hero } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private _heroes: Hero[] = [];

  get heroes(): Hero[] {
    return [...this._heroes];
  }

  constructor(private http: HttpClient) { }

  get_heroes(): void {
    this.http.get<Hero[]>('http://localhost:3000/heroes').subscribe(
      heroes => this._heroes = heroes 
    )}
}
