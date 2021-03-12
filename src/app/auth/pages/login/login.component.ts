import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor( private router: Router,
               private _auth_service: AuthService ) { }

  login(): void {
    //backend
    //user

    this._auth_service.login().subscribe(
      user => {
        if(user.id) this.router.navigate(['/heroes/']);
      }
    );
  }

  login_w_auth(): void {
    this.router.navigate(['/heroes/']);
  }


}
