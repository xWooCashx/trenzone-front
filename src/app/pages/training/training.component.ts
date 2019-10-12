import {Component, OnInit} from '@angular/core';
import {Training} from '../../class/training';
import {Activity} from '../../class/activity';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  days: string[] = ['Monday', 'Wednesday', 'Tuesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  training: Training;
  activities: Map<number, Activity[]> = new Map<number, Activity[]>();

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
    for (const index in this.days) {
      this.activities.set(Number(index), []);
    }
    this.training.activities.map(x => {
      this.activities.get(x.day).push(x);
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
