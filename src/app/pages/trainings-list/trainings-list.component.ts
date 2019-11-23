import {Component, OnInit} from '@angular/core';
import {TrainingService} from '../../service/training.service';
import {Content, Pageable, TrainingsSearchResult} from '../../class/TrainingsSearchResult';
import {TrainersSearchResult, Content as TrainerContent} from '../../class/TrainersSearchResult';
import {MatButtonToggleChange, MatDialog, PageEvent} from '@angular/material';
import {QueryObjects} from './trainings-search-panel/trainings-search-panel.component';
import {$e} from 'codelyzer/angular/styles/chars';
import {UserServiceService} from '../../service/user-service.service';
import {TrainerDetailsComponent} from './trainer-details/trainer-details.component';

@Component({
  selector: 'app-trainings-list',
  templateUrl: './trainings-list.component.html',
  styleUrls: ['./trainings-list.component.css']
})
export class TrainingsListComponent implements OnInit {
  trainingsList: Content[];
  pageSize = 10;
  pageNumber = 0;
  searchOption: Pageable;
  private queryText: string;
  private tags: string[];
  private difficulty: string;
  loading = false;
  searchResult: TrainingsSearchResult;
  pageEvent: PageEvent;
  sort = 'name';
  sortOptions = [{name: 'name', label: 'Name'},
    {name: 'name', label: 'Name'},
    {name: 'name', label: 'Name'}];
  direction = 1;
  trainersList: TrainerContent[];

  constructor(public dialog: MatDialog,
              private trainingService: TrainingService, private userService: UserServiceService) {
    // this.findResults();
    this.difficulty = '';
    this.tags = [];
    this.queryText = '';
    this.searchOption = new Pageable();
  }

  ngOnInit() {
    this.searchOption.pageNumber = 0;
    this.searchOption.pageSize = 10;
    this.searchOption.paged = true;
    this.searchResult = new TrainingsSearchResult();
    this.searchResult.size = 10;
    this.searchResult.number = 0;
  }

  search($event: QueryObjects) {
    console.log($event);
    this.queryText = $event.name;
    this.tags = $event.tags;
    this.difficulty = $event.difficulty;
    this.loading = true;
    if ($event.type === 'training') {
      this.findTrainings();
    } else if ($event.type === 'trainer') {
      this.findTrainers();
    }
  }

  findTrainings() {
    this.trainersList = null;
    this.trainingService.getTrainings(this.searchOption.pageSize,
      this.searchOption.pageNumber, this.queryText, this.tags, this.difficulty
    ).subscribe(data => {
      this.trainingsList = data.content;
      this.searchResult = data;
      this.loading = false;
    });
  }

  findTrainers() {
    this.trainingsList = null;
    this.userService.getTrainers(this.queryText
    ).subscribe(data => {
      this.trainersList = data.content;
      this.loading = false;
    });
  }

  changeResults(page) {
    // this.pageSize = page.pageSize;
    // this.searchResult.number = page.pageIndex;
    this.searchOption.pageSize = page.pageSize;
    this.searchOption.pageNumber = page.pageIndex;
    // this.findResults();
  }

  changeSort(option: string) {
    if (this.sort === option) {
      this.direction *= -1;
    } else {
      this.sort = option;
      this.direction = 1;
    }
    if (this.trainingsList) {
      this.trainingsList.sort((a, b) => {
        if (this.sort === 'name') {
          return a.name.toLowerCase() > b.name.toLowerCase() ? this.direction : (-1) * this.direction;
        }
        if (this.sort === 'rating') {
          return a.rate > b.rate ? this.direction : (-1) * this.direction;
        }
        if (this.sort === 'comments') {
          return a.commentsSize > b.commentsSize ? this.direction : (-1) * this.direction;
        }
      });
    } else if (this.trainersList) {
      this.trainersList.sort((a, b) => {
        return a.name.toLowerCase() > b.name.toLowerCase() ? this.direction : (-1) * this.direction;
      });
    }
    console.log(option);
  }

  showTrainerDetails(trainer: TrainerContent): void {
    const dialogRef = this.dialog.open(TrainerDetailsComponent, {
      width: '400px',
      data: trainer
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
