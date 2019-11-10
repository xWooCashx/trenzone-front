import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatChipInputEvent} from '@angular/material';

export class QueryObjects {
  name: string;
  tags: string[];
  difficulty: string;
}

@Component({
  selector: 'app-trainings-search-panel',
  templateUrl: './trainings-search-panel.component.html',
  styleUrls: ['./trainings-search-panel.component.css']
})
export class TrainingsSearchPanelComponent implements OnInit {
  text: string;
  @Output() query = new EventEmitter<QueryObjects>();
  @Output() sendTags = new EventEmitter<string[]>();
  tags = [];
  readonly separatorKeysCodes: number[] = [13, 188];
  addOnBlur = true;
  queryObjects = new QueryObjects();
  difficulty = '';

  constructor() {
  }

  ngOnInit() {
  }

  search() {
    this.queryObjects.name = this.text;
    this.queryObjects.tags = this.tags;
    this.queryObjects.difficulty = this.difficulty;
    this.query.emit(this.queryObjects);
  }

  searchFromKey() {

  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
