import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSearchItemComponent } from './training-search-item.component';

describe('TrainingSearchItemComponent', () => {
  let component: TrainingSearchItemComponent;
  let fixture: ComponentFixture<TrainingSearchItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingSearchItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingSearchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
