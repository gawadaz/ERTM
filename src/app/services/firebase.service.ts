import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  ertmRef: AngularFireList<any>;
  electors: Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.ertmRef = db.list('codes', ref => ref.orderByKey().startAt('0').limitToFirst(20));
    console.log('list: ' + JSON.stringify(this.ertmRef));
    this.electors = this.ertmRef.snapshotChanges().pipe(
      map(items => {
        return items.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
    );
   // console.log(this.electors);
    this.electors.forEach(elector => {
      // console.log('elector: ' + JSON.stringify(elector));
    });
   }

   getElectorsList() {
     return this.electors;
   }
}
