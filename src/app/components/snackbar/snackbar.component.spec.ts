import { TestBed, ComponentFixture, async, fakeAsync, tick, flush, discardPeriodicTasks } from '@angular/core/testing';
import { SnackbarComponent } from './snackbar.component';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [SnackbarComponent] }).compileComponents();
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
  }));

  it('should create the component', () => expect(component).toBeTruthy());

  it('should set the close animation class on setClose', () => {
    component.setCloseAnim = 'fade-out';
    component.setClose();
    expect(component.classList).toContain('fade-out');
  });

  it('should emit close event after the specified timeout', () => {
    spyOn(component.close, 'emit');
    component.timer = 1000;
    fixture.detectChanges();
    expect(component.close.emit).not.toHaveBeenCalled();
    setTimeout(() => expect(component.close.emit).toHaveBeenCalled(), component.timer + 100);
  });

  it('should set noCloseOnEsc correctly', () => {
    component.setNoCloseOnEsc = true;
    expect(component.noCloseOnEsc).toBe(true);
    component.setNoCloseOnEsc = false;
    expect(component.noCloseOnEsc).toBe(false);
  });

  it('should set classList correctly when calling setTop', () => {
    component.setTop = true;
    component.classList.push('top-in')
    expect(component.classList).toEqual(['snackbar-top top-in', 'top-in']);
    expect(component.setCloseAnim).toBe('top-out');
  });

  it('should set classList correctly when calling setBottom', () => {
    component.setBottom = true;
    component.classList.push('bottom-out')
    expect(component.classList).toEqual(['snackbar-bottom bottom-in', 'bottom-out']);
    expect(component.setCloseAnim).toBe('bottom-out');
  });

  it('should set classList correctly when calling setLeft', () => {
    component.setLeft = true;
    component.classList.push('left-out')
    expect(component.classList).toEqual(['snackbar-left left-in', 'left-out']);
    expect(component.setCloseAnim).toBe('left-out');
  });

  it('should set classList correctly when calling setRight', () => {
    component.setRight = true;
    component.classList.push('right-out')
    expect(component.classList).toEqual(['snackbar-right right-in', 'right-out']);
    expect(component.setCloseAnim).toBe('right-out');
  });

  it('should set classList correctly when calling setTopRight', () => {
    component.setTopRight = true;
    component.classList.push('top-right-out')
    expect(component.classList).toEqual(['top-right-in', 'top-right-out']);
    expect(component.setCloseAnim).toBe('top-right-out');
  });

  it('should set classList correctly when calling setTopLeft', () => {
    component.setTopLeft = true;
    component.classList.push('top-left-out')
    expect(component.classList).toEqual(['top-left-in', 'top-left-out']);
    expect(component.setCloseAnim).toBe('top-left-out');
  });

  it('should set classList correctly when calling setBottomRight', () => {
    component.setBottomRight = true;
    component.classList.push('bottom-right-out')
    expect(component.classList).toEqual(['bottom-right-in', 'bottom-right-out']);
    expect(component.setCloseAnim).toBe('bottom-right-out');
  });

  it('should set classList correctly when calling setBottomLeft', () => {
    component.setBottomLeft = true;
    component.classList.push('bottom-left-out')
    expect(component.classList).toEqual(['bottom-left-in', 'bottom-left-out']);
    expect(component.setCloseAnim).toBe('bottom-left-out');
  });

  it('should handle the "Escape" keydown event correctly', () => {
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    let spy1 = spyOn(event, 'stopPropagation');
    spy1();
    let spy2 = spyOn(event, 'preventDefault');
    spy2();
    let spy3 = spyOn(component, 'setClose');
    spy3();
    component.noCloseOnEsc = false;
    component.onKeydownHandler(event);
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
    const event2 = new KeyboardEvent('keydown', { key: 'Enter' });
    spyOn(event2, 'stopPropagation');
    spyOn(event2, 'preventDefault');
    component.onKeydownHandler(event2);
    expect(event2.stopPropagation).toHaveBeenCalled();
    expect(event2.preventDefault).toHaveBeenCalled();
    expect(component.setClose).toHaveBeenCalledTimes(2);
  });

  it('should call setClose after the specified timer duration', fakeAsync(() => {
    let spy1 = spyOn(component, 'setClose');
    spy1();
    let spy2 = spyOn(component.close, 'emit');
    spy2();
    component.timer = 1000;
    fixture.detectChanges();
    tick(component.timer);
    fixture.detectChanges();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalledTimes(1);
  }));

  it('should call setClose after the specified timer duration', fakeAsync(() => {
    let spy1 = spyOn(component, 'setClose');
    spy1();
    component.timer = 3001;
    let spy2 = spyOn(component, 'ngOnInit');
    spy2();
    tick(component.timer);
    expect(spy1).toHaveBeenCalled();
    fixture.autoDetectChanges();
    discardPeriodicTasks();
    flush();
  }));

  it('should add class and set setCloseAnim correctly when calling setClass', () => {
    component.setClass('fade-in', 'fade-out');
    expect(component.classList).toEqual(['fade-in']);
    expect(component.setCloseAnim).toBe('fade-out');
  });

  it('should add class and emit close event after a delay when calling setClose', fakeAsync(() => {
    spyOn(component.close, 'emit');
    component.setCloseAnim = 'fade-out';
    component.setClose();
    expect(component.classList).toContain('fade-out');
    tick(400);
    fixture.detectChanges();
    expect(component.close.emit).toHaveBeenCalled();
    fixture.autoDetectChanges();
    discardPeriodicTasks();
    flush();
  }));
});
