import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { User } from '../datatypes/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  memberListRef: AngularFireList<{}>;
  memberRef: firebase.database.Reference;
  members: Observable<any[]>;

  constructor(private db: AngularFireDatabase) { }

  addNewMember(user: User) {
    this.memberRef = this.db.database.ref('members');
    // this.ertmRef = this.db.list('codes', ref => ref.orderByKey().equalTo('32690893').limitToFirst(numberOfItems + 1));
    console.log(user);
    this.memberRef.push(user);
  }

  initUser(user: any, role: string): User {
    const _user = new User();
    _user.uid = user.uid;
    _user.displayName = user.displayName || '';
    _user.email = user.email;
    _user.phoneNumber = user.phoneNumber || '';
    _user.createdAt = user.createdAt || '';
    _user.lastLoginAt = user.lastLoginAt || '';
    _user.role = role;
    return _user;
  }

  getAllMembers() {
    this.memberListRef = this.db.list('members', ref => ref.orderByKey());
    // this.ertmRef = this.db.list('codes', ref => ref.orderByKey().equalTo('32690893').limitToFirst(numberOfItems + 1));
      this.members = this.memberListRef.snapshotChanges().pipe(
        map(items => {
          return items.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
      return this.members;
  }

  async getMemberByUid(uid: string): Promise<any> {
   this.memberRef = this.db.database.ref('members');
   const members = await this.memberRef.orderByChild('uid').equalTo(uid).once('value');
   return members;
  }
}
