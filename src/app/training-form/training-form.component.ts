import {Component, OnInit} from '@angular/core';
import {Training} from '../class/training';
import {ActivatedRoute, Router} from '@angular/router';
import {TrainingService} from '../service/training.service';
import {Activity} from '../class/activity';
import {ExerciseService} from '../service/exercise.service';
import {Exercise} from '../class/exercise';

@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.css']
})
export class TrainingFormComponent implements OnInit {

  training: Training;
  selectedDay: string;
  activities: Array<Activity>;
  exercises: Array<Exercise>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private trainingService: TrainingService,
              private exerciseService: ExerciseService) {
    this.training = new Training();
    this.selectedDay = 'pon';
  }

  ngOnInit() {
    this.exerciseService.findAll().subscribe(data =>
      this.exercises = data);
  }

  onSubmit() {
    this.training.date = new Date();
    this.trainingService.save(this.training).subscribe(result => this.gotoTrainingList());
  }

  gotoTrainingList() {
    this.router.navigate(['/training']);
  }

  addActivity() {

  }

}
