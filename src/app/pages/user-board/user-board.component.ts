import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})
export class UserBoardComponent implements OnInit {

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
  }

}
