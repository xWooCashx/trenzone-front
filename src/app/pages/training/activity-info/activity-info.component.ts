import {Component, Input, OnInit} from '@angular/core';
import {Activity, ActivityInterface} from '../../../class/activity';
import {MatDialog} from '@angular/material';
import {ActivityDetailsDialogComponent} from './activity-details-dialog/activity-details-dialog.component';
import {Exercise} from '../../../class/exercise';

export interface DialogData {
  id: string;
  exercise: Exercise;
  quantity: number;
  series: number;
  unit: string;
  day: number;
}

@Component({
  selector: 'app-activity-info',
  templateUrl: './activity-info.component.html',
  styleUrls: ['./activity-info.component.css']
})
export class ActivityInfoComponent implements OnInit {
  @Input()
  activity: Activity;
  @Input()
  editable;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog(): void {
    if (this.editable) {
      const dialogRef = this.dialog.open(ActivityDetailsDialogComponent, {
        data: {
          id: this.activity.id,
          quantity: this.activity.quantity,
          series: this.activity.series,
          unit: this.activity.unit
        },
        width: '300px'
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.activity.id = result.id;
        this.activity.quantity = result.quantity;
        this.activity.series = result.series;
        this.activity.unit = result.unit;
      });
    }
  }
}
