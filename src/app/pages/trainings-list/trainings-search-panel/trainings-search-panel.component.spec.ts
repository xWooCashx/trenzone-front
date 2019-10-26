import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsSearchPanelComponent } from './trainings-search-panel.component';

describe('TrainingsSearchPanelComponent', () => {
  let component: TrainingsSearchPanelComponent;
  let fixture: ComponentFixture<TrainingsSearchPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingsSearchPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
