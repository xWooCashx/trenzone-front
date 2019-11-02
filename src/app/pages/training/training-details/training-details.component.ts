import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Training} from '../../../class/training';
import {ExerciseService} from '../../../service/exercise.service';
import {AuthenticationService} from '../../../service/authentication.service';
import {TrainingService} from '../../../service/training.service';
import {COMMA, ENTER} from '@angular/cdk/typings/keycodes';
import {MatChipInputEvent} from '@angular/material';

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
  isLogged: boolean;
  isOwner: boolean;
  types: string[] = ['Beginner', 'Advanced'];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [13, 188];

  @Output() editRequest = new EventEmitter<boolean>();

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.isLogged = this.authenticationService.isLogged();
    this.isOwner = this.authenticationService.getUsername() === this.training.username;
  }

  toggleEditing() {
    this.editRequest.emit();
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.training.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag): void {
    const index = this.training.tags.indexOf(tag);

    if (index >= 0) {
      this.training.tags.splice(index, 1);
    }
  }
}
