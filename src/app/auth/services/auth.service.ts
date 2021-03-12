import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// RXJS
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
// Interfaces
import { User } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _base_url: string = environment.api_url;
  private _logged_user: User | undefined;

  get logged_user(): User {
    return {...this._logged_user!};
  }

  constructor( private _http: HttpClient ) { }

  // Guard
  verify_auth(): Observable<boolean> {
    if(!localStorage.getItem('token')) {
      return of(false);
    } else {
      return this._http.get<User>(`${this._base_url}/usuarios/1`)
                        .pipe(
                          map(user => {
                            this._logged_user = user;
                            return true;
                          })
                        );
    }
  }

  login(): Observable<User> {
    return this._http.get<User>(`${this._base_url}/usuarios/1`)
            .pipe(
              tap( user => this._logged_user = user),
              tap( user => localStorage.setItem('token', user.id) ),
            );
  }

  logout(): void {
    this._logged_user = undefined;
    localStorage.removeItem('token');
  }
}
