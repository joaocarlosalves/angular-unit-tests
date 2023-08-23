import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent = new PaginatorComponent();
  component.total = 100;

  it('should emit changePage event', () => {
    const emitSpy = spyOn(component.changePage, 'emit');
    component.emit();
    expect(emitSpy).toHaveBeenCalledWith(component.page);
  });

  it('should go to next page', () => {
    component.page = 1;
    component.goToNext(10);
    expect(component.page).toBe(11);
  });

  it('should not go beyond total pages', () => {
    component.page = 101;
    component.goToNext(1);
    component.page = 100;
    expect(component.page).toBe(100);
  });

  it('should emit changePage event on nav', () => {
    const emitSpy = spyOn(component.changePage, 'emit');
    component.nav(5, 'next');
    expect(emitSpy).toHaveBeenCalledWith(component.page);
  });

  it('should not go below 1 on previous page', () => {
    component.page = 6;
    component.goToPrev(5);
    expect(component.page).toBe(1);
  });

  it('should call goToPrev for prev direction in changepage', () => {
    const goToPrevSpy = spyOn(component, 'goToPrev');
    component.changepage(5, 'prev');
    expect(goToPrevSpy).toHaveBeenCalledWith(5);
  });
});
