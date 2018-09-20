import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { User } from '../../datatypes/user';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  user: any = {
    email: 'admin'
  };

  constructor(private router: Router, private auth: AuthService,
    private _user: UserService,
    private _cookie: CookieService
  ) { }

  async ngOnInit() {
    const uid = this._cookie.get('uid');
    if (uid) {
      const snapshot = await this._user.getUserByUID(uid);
      this.user = <User> snapshot.val();
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
