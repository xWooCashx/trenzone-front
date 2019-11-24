import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {TrainingsListComponent} from '../../trainings-list/trainings-list.component';
import {TrainingComponent} from '../training.component';

@Component({
  selector: 'app-delete-training-modal',
  templateUrl: './delete-training-modal.component.html',
  styleUrls: ['./delete-training-modal.component.css']
})
export class DeleteTrainingModalComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<TrainingComponent>) { }

  ngOnInit() {
  }

  confirm() {

  }
}
