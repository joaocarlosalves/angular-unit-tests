import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pagination',
  template: ''
})
export class PaginationComponent implements OnInit {
  current: number = 1;
  pages: number[] = [];
  @Input() max: number = 10;
  @Input() total: number = 25;
  @Output() activePage: any = new EventEmitter();

  ngOnInit() { this.reset() }
  checkValidNext() { return this.current > this.max && this.current <= this.total }
  checkValidPrev() { return this.current < this.total && this.current >= this.max }
  checkValidNextEnd() { return this.pages[this.max - 1] == this.total }
  unshift(page: number) {
    this.pages.pop();
    this.pages.unshift(page);
  }

  push(page: number) {
    this.pages.shift();
    this.pages.push(page);
  }

  reset() {
    this.pages = [];
    for(let i = 1; i <= this.max; i++) this.pages.push(i);
  }

  next() {
    if(this.checkValidNextEnd()) this.push(1);
    if(this.checkValidNext()) this.push(this.pages[this.max - 1] + 1);
    else this.reset();
  }

  prev() {
    if(this.checkValidPrev()) this.unshift(this.pages[0] - 1);
    else if(this.current < 1) this.unshift(this.total);
    else this.reset();
  }

  nav(dir: string) {
    dir === 'next' ? this.current++ && this.next() : this.current-- && this.prev();
    this.checkLimits();
    this.changePage(this.current);
  }

  checkLimits() {
    if(this.current < 1) this.current = this.total;
    else if(this.current > this.total) this.current = 1;
  }

  changePage(page: number) {
    this.current = page;
    this.activePage.emit(page);
  }
}
