import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-pi-chart',
  templateUrl: './pi-chart.component.html',
  styleUrls: ['./pi-chart.component.css']
})
export class PiChartComponent implements OnInit {

  // pieChartData: number[];
  // pieChartLabels: string[];
  @Input('pieChartLabels') pieChartLabels: string[];
  @Input('pieChartData') pieChartData: number[];
  // public pieChartLabels: string[] = ['פוטנציאלי %', 'לא פוטנציאלי %'];
  // public pieChartData: number[] = [0, 0];
  public pieChartType = 'pie';

  constructor(private fbService: FirebaseService) { }

  ngOnInit() {
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
