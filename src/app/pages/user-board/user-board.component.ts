import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {UserAchievementsComponent} from './user-achievements/user-achievements.component';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})
export class UserBoardComponent implements OnInit {
  clickedTrainingId: string;
  @ViewChild(UserAchievementsComponent, {static: false})
  private childComponent: UserAchievementsComponent;

  constructor(public authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  showAchievFor($event: string) {
    console.log('event', $event);
    this.clickedTrainingId = $event;
    this.childComponent.getAchievs($event);
  }
}
