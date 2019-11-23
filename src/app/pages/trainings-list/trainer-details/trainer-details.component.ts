import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Content as TrainerContent} from '../../../class/TrainersSearchResult';
import {TrainingsListComponent} from '../trainings-list.component';

@Component({
  selector: 'app-trainer-details',
  templateUrl: './trainer-details.component.html',
  styleUrls: ['./trainer-details.component.css']
})
export class TrainerDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TrainingsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TrainerContent) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
