import {Component, OnInit} from '@angular/core';
import {TrainingService} from '../../service/training.service';
import {Content, Pageable} from '../../class/TrainingsSearchResult';

@Component({
  selector: 'app-trainings-list',
  templateUrl: './trainings-list.component.html',
  styleUrls: ['./trainings-list.component.css']
})
export class TrainingsListComponent implements OnInit {
  private trainingsList: Content[];
  pageSize = 20;
  pageNumber = 0;
  searchOption: Pageable;

  constructor(private trainingService: TrainingService) {
    this.trainingService.getTrainings(this.pageSize, this.pageNumber).subscribe(data => {
      this.trainingsList = data.content;
    });
  }

  ngOnInit() {
    this.searchOption.pageNumber = 1;
    this.searchOption.pageSize = 20;
    this.searchOption.paged = true;
  }

}
