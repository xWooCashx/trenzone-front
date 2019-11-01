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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private exerciseService: ExerciseService) {
  }

  ngOnInit() {
  }

}
