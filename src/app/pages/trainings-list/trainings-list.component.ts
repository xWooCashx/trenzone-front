import {Component, OnInit} from '@angular/core';
import {TrainingService} from '../../service/training.service';
import {Content, Pageable, TrainingsSearchResult} from '../../class/TrainingsSearchResult';
import {PageEvent} from '@angular/material';
import {QueryObjects} from './trainings-search-panel/trainings-search-panel.component';

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

  constructor(private trainingService: TrainingService) {
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
    this.findResults();
  }

  findResults() {
    this.loading = true;
    this.trainingService.getTrainings(this.searchOption.pageSize,
      this.searchOption.pageNumber, this.queryText, this.tags, this.difficulty
    ).subscribe(data => {
      this.trainingsList = data.content;
      this.searchResult = data;
      this.loading = false;
    });
  }

  changeResults(page) {
    // this.pageSize = page.pageSize;
    // this.searchResult.number = page.pageIndex;
    this.searchOption.pageSize = page.pageSize;
    this.searchOption.pageNumber = page.pageIndex;
    this.findResults();
  }
}
