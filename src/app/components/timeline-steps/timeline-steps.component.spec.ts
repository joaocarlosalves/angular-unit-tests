import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineStepsComponent } from './timeline-steps.component';

describe('TimelineStepsComponent', () => {
  let component: TimelineStepsComponent;
  let fixture: ComponentFixture<TimelineStepsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimelineStepsComponent]
    });
    fixture = TestBed.createComponent(TimelineStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
