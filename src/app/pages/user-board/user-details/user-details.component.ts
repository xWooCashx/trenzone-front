import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../service/authentication.service';
import {UserServiceService} from '../../../service/user-service.service';
import {User} from '../../../class/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user = new User();
  userEditable = new User();
  editable = false;

  constructor(public authService: AuthenticationService, public userService: UserServiceService) {

  }

  ngOnInit() {
    this.userService.getUserDetails(this.authService.getUsername()).subscribe(value => {
      console.log('user:', value);
      this.user = value;
      this.userEditable = {...this.user};
    });
  }

  saveDetails() {
    this.userService.updateDetail(this.userEditable).subscribe(value => {
      this.user = value;
      this.editable = false;
    });
  }

  cancelEdit() {
    this.userEditable = {...this.user};
    this.editable = false;
  }
}
