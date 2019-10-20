import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesSetComponent } from './activities-set.component';

describe('ActivitiesSetComponent', () => {
  let component: ActivitiesSetComponent;
  let fixture: ComponentFixture<ActivitiesSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
