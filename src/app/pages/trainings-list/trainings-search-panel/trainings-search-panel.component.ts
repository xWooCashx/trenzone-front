import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-trainings-search-panel',
  templateUrl: './trainings-search-panel.component.html',
  styleUrls: ['./trainings-search-panel.component.css']
})
export class TrainingsSearchPanelComponent implements OnInit {
  text: string;
  @Output() query = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  search() {
      this.query.emit(this.text);
  }

  searchFromKey() {

  }
}
