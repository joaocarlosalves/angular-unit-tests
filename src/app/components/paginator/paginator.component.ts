import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-paginator',
  template: ''
})
export class PaginatorComponent {
  @Input() page: number = 1;
  @Input() total: number = 100;
  @Input() pagination: any = {};
  @Output() changePage = new EventEmitter<number>();

  nav(page: number, dir: string) {
    this.changepage(page, dir);
    this.emit();
  }

  changepage(page: number, dir: string) {
    dir === 'next' ? this.goToNext(page) : this.goToPrev(page);
  }

  goToNext(page: number) {
    this.page > this.total ? (this.page = this.total) : (this.page += page);
  }

  goToPrev(page: number) {
    this.page -= page;
  }

  emit() {
    this.changePage.emit(this.page);
  }
}
