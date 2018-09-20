import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isEmpty } from 'rxjs/operators';
import { User } from '../datatypes/user';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  showLoginForm = false;
  user: firebase.User;

  constructor(private router: Router, private auth: AuthService,
    private _cookieService: CookieService,
    private _user: UserService
  ) {}

  ngOnInit() {
    if (this.auth.isloggedIn()) {
      console.log('WTF ');
      const role = this._cookieService.get('role');
      this.router.navigate(['/' + role]);
    } else {
      console.log('WTF 2');
      this.showLoginForm = true;
    }
  }


  async login() {
    const result = await this.auth.login(this.email, this.password);
    console.log('result: ' + JSON.stringify(result));
    const memberSnapshot = await this._user.getUserByUID(result.user.uid);
    const member = <User> memberSnapshot.val();
    console.log('members: ' + JSON.stringify(member));
      this._cookieService.set('uid', result.user.uid);
      this._cookieService.set('role', member.role);
      console.log('login role: ' + member.role);
      if (member.role === 'manager') {
        this.router.navigate(['/manager']);
      } else if (member.role === 'admin') {
        console.log('/admin');
        this.router.navigate(['/admin']);
      }
  }

}
