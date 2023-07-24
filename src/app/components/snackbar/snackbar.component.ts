import { Component, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'snackbar',
  template: ''
})
export class SnackbarComponent implements OnInit {
  noButton: boolean = false;
  rounded: boolean = false;
  fullRounded: boolean = false;
  noCloseOnEsc: boolean = false;
  classList: any[] = [];
  setCloseAnim: string = '';
  @Input() text: string = '';
  @Input() icon: string = '';
  @Input() background: string = '';
  @Input() color: string = 'white';
  @Input() timer: number = 7000;
  @Input() buttonText: string = '';
  @Input('no-close-on-esc') set setNoCloseOnEsc(s: boolean | '') { this.noCloseOnEsc = s === '' || s };
  @Input('top') set setTop(t: boolean | '') { this.setClass('snackbar-top top-in', 'top-out') };
  @Input('bottom') set setBottom(b: boolean | '') { this.setClass('snackbar-bottom bottom-in', 'bottom-out') };
  @Input('left') set setLeft(l: boolean | '') { this.setClass('snackbar-left left-in', 'left-out') };
  @Input('right') set setRight(r: boolean | '') { this.setClass('snackbar-right right-in', 'right-out') };
  @Input('top-right') set setTopRight(tr: boolean | '') { this.setClass('top-right-in', 'top-right-out') };
  @Input('top-left') set setTopLeft(tl: boolean | '') { this.setClass('top-left-in', 'top-left-out') };
  @Input('bottom-left') set setBottomLeft(bl: boolean | '') { this.setClass('bottom-left-in', 'bottom-left-out') };
  @Input('bottom-right') set setBottomRight(br: boolean | '') { this.setClass('bottom-right-in', 'bottom-right-out') };
  @Output() close = new EventEmitter();
  @ViewChild('snackbar') snackbar: any = ElementRef;
  @HostListener('document:keydown', ['$event']) onKeydownHandler(e: KeyboardEvent) {
    e.stopPropagation(); e.preventDefault();
    if(!this.noCloseOnEsc && e.key === 'Escape') this.setClose();
  }

  constructor() {}

  ngOnInit() { setTimeout(() => this.setClose(), this.timer) }

  setClass(cl: string, anim: string) { this.classList.push(cl); this.setCloseAnim = anim }

  setClose() {
    this.classList.push(this.setCloseAnim);
    setTimeout(() => this.close.emit(), 400);
  }
}
