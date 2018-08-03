import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import * as _ from 'lodash';
import { Counter } from '../model/counter';
import { CounterComponent } from '../counter/counter.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Pie
  public potentialChartLabels: string[] = ['פוטנציאלי %', 'לא פוטנציאלי %'];
  public potentialChartData: number[] = [50, 300];
  votedChartLabels: string[] = ['הצביעו %', 'לא הצביעו %'];
  votedChartData: number[] = [0, 0];
  public counters: any = {};
  public totalCounter: Counter;
  public potentialCounter: Counter;
  public votedCounter: Counter;

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

  public updateChartsData() {
    // this.updatePotentialChartData();
    this.potentialChartData = this.getChartData('potential');
    this.votedChartData = this.getChartData('voted');
  }

  getChartData(counter: string) {
    const temp = this.counters[counter];
    const total = this.counters['total'];
    const counterPercentage = _.floor(temp * 100 / total, 2);
    const nonCounterPercentage = 100 - counterPercentage;
    return [ counterPercentage, nonCounterPercentage];
  }

  public updatePotentialChartData() {
    const potential = this.counters['potential'];
    const total = this.counters['total'];
    const potentialPercentage = _.floor(potential * 100 / total, 2);
    const nonpotentialPercentage = 100 - potentialPercentage;
    this.potentialChartData = [ potentialPercentage, nonpotentialPercentage];
  }

  public getCounters(): any {
    this.fbService.getCounters().subscribe(data => {
      console.log('data: ' + JSON.stringify(data));
      console.log('total: ' + data['total']);
      this.counters = data;
      this.updateChartsData();
      this.initCounterObjects();
    });
  }

  private getCounter(counter: string) {
    return _.toNumber(this.counters[counter]);
    // return 60;
  }

  private initCounterObjects() {
    this.totalCounter = {
        name: 'ס"כ בוחרים',
        count: this.getCounter('total'),
        icon: 'fa fa-users fa-3x',
        bgCard: '#73879C',
        countColor: 'white',
        nameColor: '#d3d3d3',
        iconColor: '#3beaf7'
       };

    this.potentialCounter = {
      name: 'ס"כ פוטנציאלים',
      count: this.getCounter('potential'),
      icon: 'fa fa-star fa-3x',
      bgCard: '#73879C',
      countColor: 'white',
      nameColor: '#d3d3d3',
      iconColor: 'yellow'
    };

    this.votedCounter = {
      name: 'ס"כ הצביעו',
      count: this.getCounter('voted'),
      icon: 'fa fa-thumbs-up fa-3x',
      bgCard: '#73879C',
      countColor: '#fff',
      nameColor: '#d3d3d3',
      iconColor: '#80f957'
    };
  }

}
