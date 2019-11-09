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
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  difficulties: ['EASY', 'MEDIUM_EASY', 'MEDIUM', 'MEDIUM_HARD', 'HARD'];
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
              private exerciseService: ExerciseService, public authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTrainingData(id);
    } else {
      this.loadMockData();
      this.editable = true;
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
    while (this.activities.has(index)) {
      index++;
    }
    this.activities.set(index, []);
  }

  delete(key: string) {
    this.activities.delete(key);
  }

  addActivity(key: string) {
    const dialogRef = this.dialog.open(ActivityDetailsDialogComponent, {
      data: {
        name: '',
        quantity: '',
        series: '',
        unit: ''
      },
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.activities.get(key).push(new Activity(result.name, result.quantity, result.series, result.unit, key));
      }
    }, error => console.log('error'));
  }

  toggleEdit() {
    this.editable = !this.editable;
    if (!this.editable) {
      if (this.training.id) {
        this.update();
      } else {
        this.save();
      }
    }
  }

  private save() {
    this.loading = true;
    this.trainingService.save(this.training).subscribe(value => {
      this.training = value;
      this.saveActivities();
      this.router.navigateByUrl('/training/' + this.training.id).then(r => {
      });
    }, error => this.loading = false);
  }

  private update() {
    this.loading = true;
    this.trainingService.update(this.training).subscribe(value => {
      this.training = value;
      this.saveActivities();
    }, error =>
      this.loading = false);
  }

  saveActivities() {
    let acs;
    if (this.activities.size > 0) {
      acs = this.toListActivities();
    } else {
      acs = [];
    }
    this.exerciseService.save(acs, this.training.id).subscribe(value1 => {
      this.training.activities = value1;
      this.loading = false;
    }, error => this.loading = false);
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
    this.training = new Training();
    this.trainingService.getTraining(id).subscribe(value => {
        this.training = value;
        this.exerciseService.getExercises(id).subscribe(value1 => {
          if (value1.length > 0) {
            this.training.activities = value1;
            this.mapActivities();
          }
          this.loading = false;
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
    this.training = new Training();
    this.training.username = this.authenticationService.getUsername();
    this.training.name = 'New Training';
    this.training.description = 'Training Description';
    this.training.activities = [];
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
    const listedActivities = [];
    for (const key of this.activities.keys()) {
      this.activities.get(key).map((value, index) => {
        value.day = key;
        value.sequence = index;
        listedActivities.push(value);
      });
    }
    return listedActivities;
  }

  deleteTraining() {
    this.trainingService.delete(this.training.id, this.training.username).subscribe(value => {
      this.router.navigateByUrl('/user').then(r => {
      });
    });
  }

  publish() {
    this.loading = true;
    this.trainingService.publish(this.training.id, this.training.username)
      .subscribe(value => this.loading = false);
  }
}
