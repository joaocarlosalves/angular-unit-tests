import { Component, EventEmitter, Input, OnDestroy, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'lib-loading',
  template: ''
})

export class LoadingComponent implements OnDestroy {
  @Input() text: string = 'Carregando...';
  @Output() isLoaded: any = new EventEmitter();

  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'overflow-hidden');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'overflow-hidden');
  }
}
