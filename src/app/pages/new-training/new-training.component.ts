import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag} from '@angular/cdk/drag-drop';
import {Training} from '../../class/training';
import {Activity} from '../../class/activity';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  days: string[] = ['Monday', 'Wednesday', 'Tuesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  training: Training;
  activities: Map<number, Activity[]> = new Map<number, Activity[]>();
  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  constructor() {
    this.training = new Training();
    this.training.id = '123';
    this.training.name = 'Test1';
    this.training.description = 'Testj  ore ipsum';
    this.training.activities = [
      new Activity('12b1', 3, 5, 'rep', 1),
      new Activity('1s31', 3, 5, 'rep', 1),
      new Activity('1233', 3, 5, 'rep', 3),
      new Activity('1a3', 3, 5, 'rep', 3),
      new Activity('1b35', 3, 5, 'rep', 5),
      new Activity('1a5', 3, 5, 'rep', 5),
      new Activity('12553', 3, 5, 'rep', 1),
      new Activity('112313', 3, 5, 'rep', 3),
    ];
    this.training.activities.map(x => {
      if (this.activities.has(x.day)) {
        this.activities.get(x.day).push(x);
      } else {
        this.activities.set(x.day, [x]);
      }
    });
  }

  ngOnInit() {
    console.log(this.activities);
  }

  drop(event: CdkDragDrop<Activity[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
