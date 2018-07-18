import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.css']
})
export class TestTableComponent implements OnInit, OnDestroy {


  electorsSubscription: Subscription;
  electors: any[];
  numberOfItems = 20;
  nextKey: any;
  prevKeys: any[] = [];
  searchID: string;

  constructor(private fbService: FirebaseService) { }

  ngOnInit() {
    this.getElectorsList();
    /*this.electorsSubscription = this.fbService.getElectorsList(this.numberOfItems, '0').subscribe( (electors) => {
      this.electors = electors;
     } );*/
  }

  getElectorsList(key?) {
    if (this.electorsSubscription) { this.electorsSubscription.unsubscribe(); }

    if (!key) { key = '0'; }

    this.electorsSubscription = this.fbService.getElectorsList(this.numberOfItems, key).subscribe( (electors) => {
      this.electors = _.slice(electors, 0, this.numberOfItems);
      this.nextKey = _.get(electors[this.numberOfItems], 'key');
     } );
  }

  onNext() {
    this.prevKeys.push(_.first(this.electors)['key']);
    this.getElectorsList(this.nextKey);
  }

  onPrev() {
    const prevKey = _.last(this.prevKeys);
    this.prevKeys = _.dropRight(this.prevKeys);

    this.getElectorsList(prevKey);
  }

  ngOnDestroy(): void {
    this.electorsSubscription.unsubscribe();
  }

}
