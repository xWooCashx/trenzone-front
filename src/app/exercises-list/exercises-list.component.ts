import {Component, OnInit} from '@angular/core';
import {ExerciseService} from '../service/exercise.service';
import {Exercise} from '../class/exercise';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.css']
})
export class ExercisesListComponent implements OnInit {

  viewForm = false;
  exercises: Exercise[];
  newExercise: Exercise;
  headElements = ['Name', 'Type', 'Description', 'Options'];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private exerciseService: ExerciseService) {
  }

  ngOnInit() {
    this.newExercise = new Exercise();
    this.exerciseService.findAll().subscribe(data =>
      this.exercises = data);
  }

  public delete(id: string) {
    this.exerciseService.delete(id).subscribe(result => this.ngOnInit());
  }

  public save() {
    this.exerciseService.save(this.newExercise).subscribe(result => this.ngOnInit());
  }
}
