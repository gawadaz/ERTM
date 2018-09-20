import { Component, OnInit, Input } from '@angular/core';
import { Counter } from '../model/counter';
import * as _ from 'lodash';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  isUndefined = true;
  _counter = new Counter();

  constructor() { }

  ngOnInit() {
  }

  @Input('counter')
  set counter(obj: Counter) {
    this._counter = obj;
    this.isUndefined = false;
  }

}
