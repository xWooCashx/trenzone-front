import {Component, Input, OnInit} from '@angular/core';
import {Training} from '../class/training';
import {TrainingListComponent} from '../training-list/training-list.component';

@Component({
  selector: 'app-training-card',
  templateUrl: './training-card.component.html',
  styleUrls: ['./training-card.component.css']
})
export class TrainingCardComponent implements OnInit {

  @Input() training: Training;
  listExpanded = false;

  constructor(private trainingList: TrainingListComponent) {
  }

  ngOnInit() {
  }

}
