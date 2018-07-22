import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-pi-chart',
  templateUrl: './pi-chart.component.html',
  styleUrls: ['./pi-chart.component.css']
})
export class PiChartComponent implements OnInit {

  // Pie
  public pieChartLabels: string[] = ['פוטנציאלי %', 'לא פוטנציאלי %'];
  public pieChartData: number[] = [0, 0];
  public pieChartType = 'pie';
  public counters: any = {};
  total = 100;

  constructor(private fbService: FirebaseService) { }

  ngOnInit() {
    this.getCounters();
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public getChartData() {
    const potential = this.counters['potential'];
    const total = this.counters['total'];
    const potentialPercentage = _.floor(potential * 100 / total, 2);
    const nonpotentialPercentage = 100 - potentialPercentage;
    this.pieChartData = [ potentialPercentage, nonpotentialPercentage];
  }

  getCounters(): any {
    this.fbService.getCounters().subscribe(data => {
      console.log('data: ' + JSON.stringify(data));
      console.log('total: ' + data['total']);
      this.counters = data;
      this.getChartData();
    });
  }

  getCounter(counter: string) {
    return _.toNumber(this.counters[counter]);
    // return 60;
  }

}
