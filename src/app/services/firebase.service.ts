import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  ertmRef: AngularFireList<{}>;
  countersRef: AngularFireObject<{}>;
  electors: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
  /*  this.ertmRef = db.list('codes', ref => ref.orderByKey().startAt('0').limitToFirst(20));
    console.log('list: ' + JSON.stringify(this.ertmRef));
    this.electors = this.ertmRef.snapshotChanges().pipe(
      map(items => {
        return items.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
    );
   // console.log(this.electors);
    this.electors.forEach(elector => {
      // console.log('elector: ' + JSON.stringify(elector));
    });*/
   }

   getElectorsList(numberOfItems: number, startKey?: string) {
    this.ertmRef = this.db.list('codes', ref => ref.orderByKey().startAt(startKey).limitToFirst(numberOfItems + 1));
    // this.ertmRef = this.db.list('codes', ref => ref.orderByKey().equalTo('32690893').limitToFirst(numberOfItems + 1));
      this.electors = this.ertmRef.snapshotChanges().pipe(
        map(items => {
          return items.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
      return this.electors;
   }

   getAllElectors() {
    this.ertmRef = this.db.list('codes', ref => ref.orderByChild('FirstName'));
    // this.ertmRef = this.db.list('codes', ref => ref.orderByKey().equalTo('32690893').limitToFirst(numberOfItems + 1));
      this.electors = this.ertmRef.snapshotChanges().pipe(
        map(items => {
          return items.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
      return this.electors;
   }

   updateElectorData(elector: any) {
    this.ertmRef = this.db.list('codes');
    this.ertmRef.update(elector.key, elector);
   }

   updateCounters(counter: any) {
    this.countersRef = this.db.object('counters');
    this.countersRef.update(counter);
   }

   getCounters() {
    this.countersRef = this.db.object('counters');
    return this.countersRef.valueChanges();
   }


}
