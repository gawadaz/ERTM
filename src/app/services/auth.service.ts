import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { CookieService } from 'ngx-cookie-service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth,
     private _cookiservice: CookieService
  ) {
   }

  async login(email: string, password: string): Promise<any> {
    const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    return result;
  }

  logout() {
    const promise = this.afAuth.auth.signOut();
    this._cookiservice.deleteAll();
    return promise;
  }

  isloggedIn() {
    const uid = this._cookiservice.check('uid');
    return uid;
  }

  async addUser(email: string, password: string) {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      return res;
  }
}
