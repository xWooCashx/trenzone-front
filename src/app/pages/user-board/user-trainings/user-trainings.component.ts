import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../../../service/user-service.service';
import {AuthenticationService} from '../../../service/authentication.service';
import {Content, TrainingsSearchResult} from '../../../class/TrainingsSearchResult';

@Component({
  selector: 'app-user-trainings',
  templateUrl: './user-trainings.component.html',
  styleUrls: ['./user-trainings.component.css']
})
export class UserTrainingsComponent implements OnInit {
  trainingsCreated = [];

  constructor(public userServ: UserServiceService, public authService: AuthenticationService) {
  }

  ngOnInit() {
    this.userServ.getUserTrainings(this.authService.getUsername()).subscribe(value => {
      console.log('trainings created:', JSON.stringify(value));
      this.trainingsCreated = value;
    });
  }

}
