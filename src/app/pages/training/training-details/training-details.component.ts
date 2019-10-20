import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Training} from '../../../class/training';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.css']
})
export class TrainingDetailsComponent implements OnInit {
  @Input()
  training: Training;
  @Input()
  editable: boolean;
  types: string[] = ['Beginner', 'Advanced'];
  @Output() editRequest = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
    console.log('desc:', this.training.description);
  }
  toggleEditing() {
    this.editRequest.emit();
  }
}
