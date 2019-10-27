import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingCommentsComponent } from './training-comments.component';

describe('TrainingCommentsComponent', () => {
  let component: TrainingCommentsComponent;
  let fixture: ComponentFixture<TrainingCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
