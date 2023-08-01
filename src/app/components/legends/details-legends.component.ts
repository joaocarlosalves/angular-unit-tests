import { Component, EventEmitter, Output, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'details-legends',
  template: ''
})
export class DetailsLegendsComponent {
  @Output() isClosed: any = new EventEmitter();
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Escape') this.isClosed.emit(true);
  }
  @HostListener('document:mousedown', ['$event']) clickout(event: any) {
    if (!this.elem.nativeElement.contains(event.target)) this.isClosed.emit(true);
  }

  constructor(public elem: ElementRef) {}
}
