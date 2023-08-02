import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Renderer2 } from '@angular/core';
import { LoadingComponent } from './loading';

describe('LoadingComponent', () => {
  let component: LoadingComponent,
      fixture: ComponentFixture<LoadingComponent>,
      renderer: Renderer2;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ declarations: [LoadingComponent] }).compileComponents();
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    renderer = fixture.componentRef.injector.get(Renderer2);
  });

  it('should emit "isLoaded" event on ngOnDestroy', () => {
    const emitSpy = spyOn(component.isLoaded, 'emit');
    emitSpy();
    component.ngOnDestroy();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should add "overflow-hidden" class to body element on construction', () => {
    const addClassSpy = spyOn(renderer, 'addClass');
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    expect(addClassSpy).toHaveBeenCalledWith(document.body, 'overflow-hidden');
  });

  it('should remove "overflow-hidden" class from body element on destruction', () => {
    const removeClassSpy = spyOn(renderer, 'removeClass');
    component.ngOnDestroy();
    expect(removeClassSpy).toHaveBeenCalledWith(document.body, 'overflow-hidden');
  });
});
