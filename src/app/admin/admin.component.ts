import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: any;

  constructor(private _cookie: CookieService) { }

  ngOnInit() {
    const uid = this._cookie.get('uid');
//    this.user = this._member._getMemberByUid(uid);
  }

}
