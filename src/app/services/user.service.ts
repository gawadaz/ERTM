import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  updateMemberRole(uid: string, role: string): Promise<any> {
    const userRef = this.db.database.ref('users');
    return userRef.child(uid).update({
      role: role
    });
  }

  getAllUsers() {
    const userRef = this.db.list('users', ref => ref.orderByKey());
    // this.ertmRef = this.db.list('codes', ref => ref.orderByKey().equalTo('32690893').limitToFirst(numberOfItems + 1));
    const users = userRef.snapshotChanges().pipe(
        map(items => {
          return items.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
      return users;
  }

  async getUserByUID(uid: string) {
    const userRef = this.db.database.ref('users');
    return await userRef.child(uid).once('value');
  }
}
