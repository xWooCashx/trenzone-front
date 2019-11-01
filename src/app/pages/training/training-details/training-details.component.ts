import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Training} from '../../../class/training';
import {ExerciseService} from '../../../service/exercise.service';
import {AuthenticationService} from '../../../service/authentication.service';
import {TrainingService} from '../../../service/training.service';

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
  @Output() editRequest = new EventEmitter<boolean>();

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.isLogged = this.authenticationService.isLogged();
    console.log(this.authenticationService.getUsername());
    console.log(this.training.username);
    this.isOwner = this.authenticationService.getUsername() === this.training.username;
  }

  toggleEditing() {
    this.editRequest.emit();
  }
}
