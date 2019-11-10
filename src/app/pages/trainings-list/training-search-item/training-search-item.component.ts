import {Component, Input, OnInit} from '@angular/core';
import {Content} from '../../../class/TrainingsSearchResult';
import {Router} from '@angular/router';

@Component({
  selector: 'app-training-search-item',
  templateUrl: './training-search-item.component.html',
  styleUrls: ['./training-search-item.component.css']
})
export class TrainingSearchItemComponent implements OnInit {
  @Input()
  training: Content;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigateTo(id: number, name: string) {
    // this.router.navigateByUrl('/training', id, name).then(value => {
    // });
  }
}
