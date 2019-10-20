import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Activity} from '../../../../class/activity';
import {DialogData} from '../activity-info.component';

@Component({
  selector: 'app-activity-details-dialog',
  templateUrl: './activity-details-dialog.component.html',
  styleUrls: ['./activity-details-dialog.component.css']
})
export class ActivityDetailsDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ActivityDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
