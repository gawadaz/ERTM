import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateAuthGuardService implements CanActivate {

  user: firebase.User;

  constructor(private router: Router, private auth: AuthService,
    private _cookieService: CookieService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    const uid = this._cookieService.get('uid');
    const role = this._cookieService.get('role');
    // const user = <User> this.auth.getUser();
    // const user = this._member.getMemberByUid(uid);
    if (role && role === 'manager') { return true; }
    this.router.navigate(['']);
    return false;
  }

/*  canActivate() {
    this.auth.isloggedIn()
    .subscribe( user => {
      if (user) {
        return true;
      }
      // this.router.navigate(['']);
      return false;
    });
  }*/

}
