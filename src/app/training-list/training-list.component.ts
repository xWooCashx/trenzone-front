import {Component, OnInit} from '@angular/core';
import {Training} from '../class/training';
import {TrainingService} from '../service/training.service';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit {

  trainings: Training[];

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.trainingService.findAll().subscribe(data => {
      this.trainings = data;
    });
  }

}
