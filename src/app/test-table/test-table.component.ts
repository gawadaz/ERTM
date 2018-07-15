import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.css']
})
export class TestTableComponent implements OnInit, OnDestroy {

  electorsSubscription: Subscription;
  electors: any[];

  constructor(private fbService: FirebaseService) { }

  ngOnInit() {
    this.electorsSubscription = this.fbService.getElectorsList().subscribe( (electors) => {
      this.electors = electors;
      // this.electors = this.electors.slice(0, 10);
      // console.log('electors: ' + JSON.stringify(electors));
     } );
  }

  ngOnDestroy(): void {
    this.electorsSubscription.unsubscribe();
  }
}
