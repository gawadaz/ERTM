import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as _ from 'lodash';

@Component({
  selector: 'app-electors-table',
  templateUrl: './electors-table.component.html',
  styleUrls: ['./electors-table.component.css']
})
export class ElectorsTableComponent implements OnInit {

  @ViewChild('template') template: TemplateRef<any>;

  selectedRows: Array<any> = [];
  modalRef: BsModalRef;
  selectedData: any = {};
  end: number;
  electorsSubscription: Subscription;
  start: number;
  loadingTable = true;
  currPage = 1;
  public data: Array<any> = [];
  public rows: Array<any> = [];
  public temp: Array<any> = [];
  public columns: Array<any> = [
    {title: 'ת.ז', name: 'key', filtering: {filterString: '', placeholder: 'חפש לפי ת.ז'}},
    {title: 'שם פרטי', name: 'FirstName', filtering: {filterString: '', placeholder: 'חפש לפי שם פרטי'}},
    {title: 'שם אמצעי', name: 'MidName', filtering: {filterString: '', placeholder: 'חפש לפי שם אמצעי'}},
    {title: 'שם משפחה', name: 'LastName', filtering: {filterString: '', placeholder: 'חפש לפי שם משפחה'}},
    {
      title: 'מס קלפי',
      name: 'Klpe',
      filtering: {filterString: '', placeholder: 'חפש לפי מס קלפי'}
    },
    {title: 'מס סידורי', name: 'SeqNumber', hidden: false, filtering: {filterString: '', placeholder: 'חפש לפי מס סידורי'}},
    {title: 'הצביע?', name: 'Vote', hidden: false, filtering: {filterString: '', placeholder: 'הצביע?'}},
    {title: 'פוטנציאלי?', name: 'Potential', hidden: false, filtering: {filterString: '', placeholder: 'פוטנציאלי?'}},

  ];
  constructor(private fbService: FirebaseService, private modalService: BsModalService) { }

  ngOnInit() {
    this.loadingTable = true;
    this.start = new Date().getTime();
    this.getAllElectors();
  }

  getAllElectors(): any {
    if (this.electorsSubscription) { this.electorsSubscription.unsubscribe(); }

    this.electorsSubscription = this.fbService.getAllElectors().subscribe( (electors) => {
      setTimeout(() => {
        this.loadingTable = false;
      }, 4000);
      // this.loadingTable = false;
      this.end = new Date().getTime();
      console.log('total time: ' + (this.end - this.start));
      this.data = electors;
      this.rows = this.data;
    });
  }

  onFilterStringChange(event, fieldName){
    console.log(event + ' ' + fieldName);
    // this.logger.debug(this.component, event + " " + fieldName);
    this.rows = this.data;
    for (const col of this.columns){
      // console.log('col name: ' + col.name);
      // console.log('col filtering: ' + col.filtering.filterString);
      // this.logger.debug(this.component, 'col filtering: ' + col.filtering.filterString);
      const filterString = col.filtering.filterString;
      // var newFilterString = this.parseFilterString(filterString);
      const newFilterString = filterString;
      const regexValue = new RegExp(newFilterString, 'gi');
      let result;
      this.rows = this.rows.filter( singleItem => {
          if (singleItem[col.name] !== null) {
            result = String(singleItem[col.name]).match(regexValue);
          } else {
            // this.logger.debug(this.component, "Column name value is null: " + singleItem[col.name]);
          }
        if (result) {
          return true;
        }
        return false;
      });
    }
  }

  public onCellClick(row: any): any {
    // this.logger.debug(this.component, JSON.stringify(row));
    this.selectedData = row;
    this.modalRef = this.modalService.show(this.template);
    // document.getElementById('viewScriptDetailsBtn').click();
  }

  onRowClick(key: any) {
    // console.log('key: ' + key);
    if (this.selectedRows.indexOf(key) > -1 ) {
      this.selectedRows = _.pull(this.selectedRows, key);
    } else {
      this.selectedRows.push(key);
    }
    console.log('length: ' + this.selectedRows.length);
  }

  clearSelectedRows() {
    this.selectedRows = [];
  }

  setElectorsAsPotential(status: boolean) {
    const potential = (status) ? 'כן' : 'לא';
    this.selectedRows.forEach(key => {
      const result = this.rows.filter( row => row.key === key );
      result[0].Potential = potential;
      this.fbService.updateElectorData(result[0]);
    });
    this.selectedRows = [];
  }

  setElectorsAsVoted(status: boolean){
    const vote = (status) ? 'כן' : 'לא';
    this.selectedRows.forEach(key => {
      const result = this.rows.filter( row => row.key === key );
      result[0].Vote = vote;
      this.fbService.updateElectorData(result[0]);
    });
    this.selectedRows = [];
  }

}
