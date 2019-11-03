import {Component, OnInit} from '@angular/core';
import {TrainingService} from '../../service/training.service';
import {Content, Pageable, TrainingsSearchResult} from '../../class/TrainingsSearchResult';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-trainings-list',
  templateUrl: './trainings-list.component.html',
  styleUrls: ['./trainings-list.component.css']
})
export class TrainingsListComponent implements OnInit {
  trainingsList: Content[];
  pageSize = 20;
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
    this.searchOption.pageNumber = 1;
    this.searchOption.pageSize = 20;
    this.searchOption.paged = true;
    this.searchResult = new TrainingsSearchResult();
    this.searchResult.size = 10;
    this.searchResult.number = 0;
  }

  search($event: string) {
    console.log($event);
    this.queryText = $event;
    this.findResults();
  }

  findResults() {
    this.loading = true;
    this.trainingService.getTrainings(this.pageSize, this.searchResult.number, this.queryText
      , this.tags, this.difficulty
    ).subscribe(data => {
      this.trainingsList = data.content;
      this.searchResult = data;
      this.loading = false;
    });
  }

  changeResults(page) {
    this.pageSize = page.pageSize;
    this.searchResult.number = page.pageIndex;
    this.findResults();
  }
}
