import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private _auth_service: AuthService,
              private _router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this._auth_service.verify_auth()
      .pipe(
        tap( resp => {
          if(!resp) {
            console.log('Blocked by Guard - canActivate')
            this._router.navigate(['/auth/login'])
        };
        })
      );
    // if (this._auth_service.logged_user.id) {
    //   return true;
    // } else {
    //   console.log("Blocked by Guard - Can Activate");
    //   return false;
    // }
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this._auth_service.verify_auth()
      .pipe(
        tap( resp => {
          if(!resp) {
            console.log('Blocked by Guard - canLoad')
            this._router.navigate(['/auth/login'])
        };
        })
      );
    // if (this._auth_service.logged_user.id) {
    //   return true;
    // } else {
    //   console.log("Blocked by Guard - Can Load");
    //   return false;
    // }
  }
}
