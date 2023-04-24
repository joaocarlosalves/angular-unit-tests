import { Component, Input } from '@angular/core';

@Component({
  selector: 'p-accordion',
  template: ''
})

export class PootaAccordionComponent {
  border: boolean = false;
  noBorder: boolean = false;
  noPadding: boolean = false;
  rounded: boolean = false;
  @Input() triggerText: string = '';
  @Input() title: string = '';
  @Input() list: any = '';
  @Input() icon: string = '';
  @Input() color: string = '';
  @Input() content: any = '';
  @Input() text: any = '';
  @Input() opened: boolean = false
  @Input('border') set setBorder(border: boolean | '') { this.border = border === '' || border }
  @Input('no-border') set setNoBorder(noBorder: boolean | '') { this.noBorder = noBorder === '' || noBorder }
  @Input('no-padding') set setNoPadding(noPadding: boolean | '') { this.noPadding = noPadding === '' || noPadding }
  @Input('rounded') set setRounded(rounded: boolean | '') { this.rounded = rounded === '' || rounded }
}
