import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as _ from 'lodash';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  selectedUser: any;
  users: any[];
  modalRef: BsModalRef;
  roles = Array.of('admin', 'manager', 'basic');
  constructor(private _users: UserService, private modalService: BsModalService) { }

  ngOnInit() {
    this._users.getAllUsers()
    .subscribe( users => {
      this.users = users;
    });
  }

  openModal(template: TemplateRef<any>, user: any) {
    this.modalRef = this.modalService.show(template);
    console.log('users: ' + JSON.stringify(user));
    this.selectedUser = _.clone(user);
    console.log(user.email);
  }

  updateUser() {
    console.log(this.selectedUser.key + ' - ' + this.selectedUser.role);
    this._users.updateMemberRole(this.selectedUser.key, this.selectedUser.role)
    .then( res => {
      alert('user updated successfully');
      this.modalService.hide(1);
    })
    .catch( error => {
      console.log('error: ' + error);
    });
  }

}
