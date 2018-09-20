import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  updateResult: Promise<boolean>;
  email: string;
  password1: string;
  password2: string;
  showError = false;
  errorMsg = '';
  roles = Array<string>();
  selectedRole: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.roles = Array<string>();
    this.roles.push('admin');
    this.roles.push('manager');
    this.roles.push('basic');
  }

  async addUser() {
    if (!this.isUndefined(this.email) && !this.isUndefined(this.password1) && !this.isUndefined(this.password2)) {
      if (this.password1 === this.password2){
        try {
          const userCredintial = await this.auth.addUser(this.email, this.password1);
          const user = userCredintial.user;
          alert('הוספת משתמש התבצעה בהצלחה!');
        } catch (error) {
          console.log('failed to add user: ' + error);
          alert('הוספה נכשלה');
        }
      } else {
        this.showError = true;
        this.errorMsg = 'סיסמאות לא תואמות!!';
      }
    } else {
      this.showError = true;
      this.errorMsg = 'אחד או יותר מהשדות לא מאותחל';
    }
  }

  isUndefined(attribute: string) {
    return (!attribute) ? true : false;
  }

  clearform(): any {
    this.email = '';
    this.password1 = '';
    this.password2 = '';
    this.selectedRole = '';
  }
}
