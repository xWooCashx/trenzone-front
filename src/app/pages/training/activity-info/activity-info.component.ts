import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../../class/activity';

@Component({
  selector: 'app-activity-info',
  templateUrl: './activity-info.component.html',
  styleUrls: ['./activity-info.component.css']
})
export class ActivityInfoComponent implements OnInit {
  @Input()
  activity: Activity;

  constructor() {
  }

  ngOnInit() {
  }

}
