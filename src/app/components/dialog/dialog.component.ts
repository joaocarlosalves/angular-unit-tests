import { Component, EventEmitter, Input, Output, HostListener, ElementRef, Renderer2, OnDestroy }
  from '@angular/core';

@Component({
  selector: 'b-dialog',
  template: ''
})
export class DialogComponent implements OnDestroy {
  noEscape: boolean = false;
  @Input() noHeader: boolean = false;
  @Input() title: string = 'Hey Front End, na moral, dropa um título pá nois?';
  @Output() isClosed: any = new EventEmitter();
  @Input() set setNoEscape(b: boolean | '') { this.noEscape = b === '' || b };
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Escape' && !this.noEscape) this.closeDialog();
  }

  constructor(
    public elem: ElementRef,
    private renderer: Renderer2
  ) { this.renderer.addClass(document.body, 'overflow-hidden') }

  ngOnDestroy() { this.renderer.removeClass(document.body, 'overflow-hidden') }

  closeDialog() { this.isClosed.emit(true) }
}
