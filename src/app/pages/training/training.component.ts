import {Component, OnInit} from '@angular/core';
import {Training} from '../../class/training';
import {Activity} from '../../class/activity';
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog, MatInput} from '@angular/material';
import {ActivityDetailsDialogComponent} from './activity-info/activity-details-dialog/activity-details-dialog.component';
import {Author} from '../../class/author';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {TrainingService} from '../../service/training.service';
import {subscribeOn, switchMap} from 'rxjs/operators';
import {ExerciseService} from '../../service/exercise.service';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  editable = false;
  loading = false;
  days: string[] = ['Monday', 'Wednesday', 'Tuesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  training: Training;
  author: Author;
  searchedPhrase = '';
  activitiesSearchResults: Activity[] = [];
  temporaryArray: Activity[] = [];
  activities: Map<any, Activity[]> = new Map<number, Activity[]>();
  editingDay = '';
  newActivity: Activity;

  constructor(public dialog: MatDialog, private route: ActivatedRoute,
              private router: Router, private trainingService: TrainingService,
              private exerciseService: ExerciseService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTrainingData(id);
    } else {
      this.loadMockData();
    }
  }

  drop(event: CdkDragDrop<Activity[]>) {
    if (event.previousContainer === event.container) {
      // event.container.data[event.currentIndex].sequence = event.currentIndex;
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    // event.container.data[event.currentIndex].sequence = event.currentIndex + '';
  }

  addNewDay() {
    let index = 1;
    while (this.activities.has(index + '')) {
      index++;
    }
    this.activities.set(index + '', []);
  }

  delete(key: string) {
    this.activities.delete(key);
  }

  addActivity(key: string) {
    // this.activities.get(key).push();
    const dialogRef = this.dialog.open(ActivityDetailsDialogComponent, {
      data: {
        id: '',
        quantity: '',
        series: '',
        unit: ''
      },
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.activities.get(key).push(new Activity(result.id, result.quantity, result.series, result.unit, key));
    });
  }

  toggleEdit() {
    this.editable = !this.editable;
    if (!this.editable) {
      this.save();
    }
  }

  private save() {
    this.loading = true;
    this.trainingService.save(this.training).subscribe(value => {
      console.log('respoinse saivng tra:', value);
      this.training = value;
      this.exerciseService.save(this.toListActivities(), this.training.id).subscribe(value1 => {
        console.log('respoinse saivng exc:', value1);
        this.training.activities = value1;
        this.loading = false;
      }, error => this.loading = false);
    });
  }

  removeActivity(day, index: number) {
    if (index === 0) {
      day.shift();
    } else {
      day.splice(index, index);
    }
  }

  loadTrainingData(id) {
    this.loading = true;
    this.trainingService.getTraining(id).subscribe(value => {
        this.training = value;
        this.exerciseService.getExercises(id).subscribe(value1 => {
          console.log('value1' + value1);
          if (value1.length > 0) {
            this.training.activities = value1;
            this.mapActivities();
          }
          this.loading = false;
          console.log('<=============================>');
          console.log(JSON.stringify(this.training));
        }, error => {
          console.log('error');
          this.loading = false;
        });
      }, error => {
        console.log('error');
        this.loading = false;
      }
    );
  }

  loadMockData() {
    this.author = new Author();
    this.author.firstName = 'Joe';
    this.author.lastName = 'Doe';
    this.training = new Training();
    this.training.username = this.authenticationService.getUsername();
    this.training.name = 'Training' + Math.ceil(Math.random() * 100 % 100);
    this.training.description = 'Testj  ore ipsumsssssssssssssssssss' +
      'Testj  ore ipsumsssssssssssssssssss';
    this.training.activities = [];
    // this.training.activities = [
    //   new Activity('12b1', 3, 5, 'rep', '1'),
    //   new Activity('1s31', 3, 5, 'rep', '1'),
    //   new Activity('1233', 3, 5, 'rep', '2'),
    //   new Activity('1a3', 3, 5, 'rep', '2'),
    //   new Activity('1b35', 3, 5, 'rep', '3'),
    //   new Activity('1a5', 3, 5, 'rep', '3'),
    //   new Activity('12553', 3, 5, 'rep', '2'),
    //   new Activity('112313', 3, 5, 'rep', '2'),
    // ];
    this.mapActivities();
  }

  mapActivities() {
    this.training.activities.map(x => {
      if (this.activities.has(x.day)) {
        this.activities.get(x.day).push(x);
      } else {
        this.activities.set(x.day, [x]);
      }
    });
  }

  toListActivities(): Activity[] {
    // this.training.activities = [];
    const listedActivities = [];
    for (const key of this.activities.keys()) {
      this.activities.get(key).map((value, index) => {
        value.day = key;
        value.sequence = index;
        listedActivities.push(value);
      });
    }
    console.log('activities:', listedActivities);
    return listedActivities;
  }
}
