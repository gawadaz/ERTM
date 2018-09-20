import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../datatypes/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {

  constructor(private router: Router, private auth: AuthService,
    private _cookieService: CookieService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    const uid = this._cookieService.get('uid');
    const role = this._cookieService.get('role');
    // const user = <User> this.auth.getUser();
    // const user = this._member.getMemberByUid(uid);
    console.log('role: ' + role);
    if (role && role === 'admin') { return true; }
    this.router.navigate(['']);
    return false;
  }
}
