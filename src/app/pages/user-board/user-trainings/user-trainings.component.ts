import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
  trainingsActivated = [];
  @Output() show = new EventEmitter<string>();

  constructor(public userServ: UserServiceService, public authService: AuthenticationService) {
  }

  ngOnInit() {
    this.userServ.getUserTrainings(this.authService.getUsername()).subscribe(value => {
      console.log('trainings created:', JSON.stringify(value));
      this.trainingsCreated = value;
    });
    this.userServ.getUserActiveTrainings(this.authService.getUsername()).subscribe(value => {
      console.log('trainings active:', JSON.stringify(value.content));
      this.trainingsActivated = value.content;
    });
    // this.userServ.findAllCommentsForAccount(this.authService.getUsername()).subscribe(value => {
    //   console.log('trainings active:', JSON.stringify(value.content));
    //   this.trainingsActivated = value.content;
    // });
  }

  showAchievs(id) {
    console.log(id);
    this.show.emit(id);
  }

}
