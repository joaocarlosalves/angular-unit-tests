import { Component, Input } from '@angular/core';

@Component({
  selector: 'timeline-steps',
  template: ''
})
export class TimelineStepsComponent {
  @Input() steps: any = [];
}
