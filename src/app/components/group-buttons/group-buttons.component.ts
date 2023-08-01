import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface GroupButtons { text: string, value: string };

@Component({
  selector: 'app-group-buttons',
  template: ''
})

export class GroupButtonsComponent {
  activeBtn: number = 0;
  @Input() buttons: GroupButtons[] = [];
  @Output() getActiveButton: any = new EventEmitter();

  setActiveButton(index: number) {
    this.activeBtn = index;
    this.getActiveButton.emit(this.buttons[index]);
  };
};
