import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../../../service/user-service.service';
import {AuthenticationService} from '../../../service/authentication.service';
import {TrainingsSearchResult} from '../../../class/TrainingsSearchResult';

@Component({
  selector: 'app-user-trainings',
  templateUrl: './user-trainings.component.html',
  styleUrls: ['./user-trainings.component.css']
})
export class UserTrainingsComponent implements OnInit {
  trainingsCreated = new TrainingsSearchResult();

  constructor(public userServ: UserServiceService, public authService: AuthenticationService) {
  }

  ngOnInit() {
    this.userServ.getUserTrainings(this.authService.getUsername()).subscribe(value =>
    this.trainingsCreated = value);
  }

}
