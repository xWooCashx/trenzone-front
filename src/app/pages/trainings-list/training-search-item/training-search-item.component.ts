import {Component, Input, OnInit} from '@angular/core';
import {Content} from '../../../class/TrainingsSearchResult';

@Component({
  selector: 'app-training-search-item',
  templateUrl: './training-search-item.component.html',
  styleUrls: ['./training-search-item.component.css']
})
export class TrainingSearchItemComponent implements OnInit {
  @Input()
  training: Content;

  constructor() {
  }

  ngOnInit() {
  }

}
