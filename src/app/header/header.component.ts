import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';
import { User } from '../datatypes/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User = {
    email: 'manager'
  };

  constructor(private router: Router, public auth: AuthService,
    private _user: UserService,
    private _cookie: CookieService
  ) { }

  async ngOnInit() {
    const uid = this._cookie.get('uid');
    if (uid) {
      const snapshot = await this._user.getUserByUID(uid);
      this.user = <User> snapshot.val();
      this.user.uid = snapshot.key;
    }
  }

  logout() {
    this.auth.logout()
    .then( res => {
      console.log('you logged out successfully!');
      this.router.navigate(['']);
    });
  }

}
