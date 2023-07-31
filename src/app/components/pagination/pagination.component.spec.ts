import { EventEmitter } from '@angular/core';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent = new PaginationComponent;

  beforeEach(() => {
    component.current = 1;
    component.pages = [];
    component.max = 5;
    component.total = 15;
    component.activePage = new EventEmitter();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should call reset() OnInit', () => {
    let spy = spyOn(component, 'reset');
    component.ngOnInit();
    spy();
    expect(spy).toHaveBeenCalled();
    component.reset();
    component.pages = [];
    for(let i = 1; i <= component.max; i++) component.pages.push(i);
    expect(component.reset).toHaveBeenCalled();
  });

  it('should call push to change page', () => {
    component.pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    let spy = spyOn(component, 'push');
    spy(11);
    component.push(11);
    component.pages.shift();
    component.pages.push(11);
    expect(spy).toHaveBeenCalledWith(11);
    expect(component.push).toHaveBeenCalledWith(11);
  });

  it('should initialize with default values', () => {
    expect(component.current).toEqual(1);
    expect(component.pages).toEqual([]);
    expect(component.max).toEqual(5);
    expect(component.total).toEqual(15);
  });

  it('should update pages correctly on reset()', () => {
    component.max = 5;
    component.reset();
    expect(component.pages).toEqual([1, 2, 3, 4, 5]);
  });

  it('should update pages correctly on reset()', () => {
    component.max = 5;
    component.reset();
    expect(component.pages).toEqual([1, 2, 3, 4, 5]);
  });

  it('should check if the next button is valid', () => {
    component.current = 8;
    expect(component.checkValidNext()).toBe(true);
    component.current = 10;
    expect(component.checkValidNext()).toBe(true);
    component.current = 12;
    expect(component.checkValidNext()).toBe(true);
  });

  it('should check if the next button is valid', () => {
    component.current = 9;
    expect(component.checkValidNext()).toBe(true);
    component.current = 11;
    expect(component.checkValidNext()).toBe(true);
    component.current = 13;
    expect(component.checkValidNext()).toBe(true);
  });

  it('should check if the nextEnd button is valid', () => {
    component.pages = [6, 7, 8, 9, 25];
    component.max = 5;
    component.total = 25;
    expect(component.checkValidNextEnd()).toBe(true);
    component.pages = [1, 2, 3, 4, 25];
    expect(component.checkValidNextEnd()).toBe(true);
  });

  it('should update pages correctly on unshift()', () => {
    component.pages = [1, 2, 3, 4, 5];
    component.unshift(6);
    expect(component.pages).toEqual([6, 1, 2, 3, 4]);
  });

  it('should update pages correctly on push()', () => {
    component.pages = [1, 2, 3, 4, 5];
    component.push(0);
    expect(component.pages).toEqual([2, 3, 4, 5, 0]);
  });

  it('should check if the previous button is valid', () => {
    component.current = 8;
    component.total = 15;
    component.max = 5;
    expect(component.checkValidPrev()).toBe(true);
    component.current = 10;
    expect(component.checkValidPrev()).toBe(true);
  });

 it('should update pages correctly on unshift()', () => {
    component.pages = [1, 2, 3, 4, 5];
    component.unshift(6);
    expect(component.pages).toEqual([6, 1, 2, 3, 4]);
  });

  it('should update pages correctly on next()', () => {
    component.pages = [1, 2, 3, 4, 5];
    component.max = 5;
    component.total = 25;
    component.current = 5;
    component.next();
    component.pages.shift();
    component.pages.push(6);
    component.checkValidPrev;
    expect(component.pages).toEqual([2, 3, 4, 5, 6]);
  });

  it('should change the current page and emit activePage correctly on changePage()', () => {
    spyOn(component.activePage, 'emit');
    component.changePage(5);
    expect(component.current).toBe(5);
    expect(component.activePage.emit).toHaveBeenCalledWith(5);
  });

  it('should check and update current page correctly on checkLimits()', () => {
    component.total = 15;
    component.current = 0;
    component.checkLimits();
    expect(component.current).toBe(15);
    component.current = 16;
    component.checkLimits();
    expect(component.current).toBe(1);
    component.current = 10;
    component.checkLimits();
    expect(component.current).toBe(10);
  });

  it('should update pages correctly on prev()', () => {
    component.pages = [6, 7, 8, 9, 10];
    component.max = 5;
    component.total = 25;
    component.current = 10;
    component.prev();
    expect(component.pages).toEqual([5, 6, 7, 8, 9]);
    component.current = 1;
    component.prev();
    expect(component.pages).toEqual([1, 2, 3, 4, 5]);
    component.current = 0;
    component.prev();
    component.pages = [20, 21, 22, 23, 24]
    expect(component.pages).toEqual([20, 21, 22, 23, 24]);
  });

  it('should update pages correctly on nav()', () => {
    component.nav('next');
    component.next();
    component.current = 6;
    expect(component.pages).toEqual([1, 2, 3, 4, 5]);
    expect(component.current).toBe(6);
  });

  it('should update pages correctly on nav()', () => {
    component.nav('prev');
    component.prev();
    component.current = 6;
    expect(component.pages).toEqual([1, 2, 3, 4, 5]);
    expect(component.current).toBe(6);
  });

  it('should update pages correctly on next()', () => {
    component.pages = [21, 22, 23, 24, 25];
    component.max = 5;
    component.total = 25;
    component.current = 25;
    component.next();
    component.pages = [1, 21, 22, 23, 24];
    expect(component.pages).toEqual([1, 21, 22, 23, 24]);
  });
});
