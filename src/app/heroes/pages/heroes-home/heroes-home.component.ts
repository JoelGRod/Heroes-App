import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-heroes-home',
  templateUrl: './heroes-home.component.html',
  styles: [
    `
    .container {
      margin: 25px;
    }
    `
  ]
})
export class HeroesHomeComponent {

  get logged_user(): User {
    return this._auth_service.logged_user;
  }

  constructor(private _router: Router,
              private _auth_service: AuthService ) { }

  logout(): void {
    this._auth_service.logout();
    this._router.navigate(['/auth/login']);
  }

}
