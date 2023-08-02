import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { Renderer2 } from '@angular/core';

describe('DialogComponent', () => {
  let component: DialogComponent,
      fixture: ComponentFixture<DialogComponent>,
      renderer: Renderer2,
      event = new KeyboardEvent('keydown', { key: 'Escape' });

  beforeEach(async () => {
    await TestBed.configureTestingModule({ declarations: [DialogComponent] }).compileComponents();
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    renderer = fixture.componentRef.injector.get(Renderer2);
  });

  it('should add "overflow-hidden" class to body element on construction', () => {
    const addClassSpy = spyOn(renderer, 'addClass');
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    expect(addClassSpy).toHaveBeenCalledWith(document.body, 'overflow-hidden');
  });

  it('should remove "overflow-hidden" class from body element on destruction', () => {
    const removeClassSpy = spyOn(renderer, 'removeClass');
    component.ngOnDestroy();
    expect(removeClassSpy).toHaveBeenCalledWith(document.body, 'overflow-hidden');
  });

  it('should emit "isClosed" event when closeDialog is called', () => {
    const emitSpy = spyOn(component.isClosed, 'emit');
    component.closeDialog();
    expect(emitSpy).toHaveBeenCalledWith(true);
  });

  it('should close the dialog on "Escape" key press if noEscape is false', () => {
    const closeDialogSpy = spyOn(component, 'closeDialog');
    component.noEscape = false;
    component.onKeydownHandler(event);
    expect(closeDialogSpy).toHaveBeenCalled();
  });

  it('should not close the dialog on "Escape" key press if noEscape is true', () => {
    const closeDialogSpy = spyOn(component, 'closeDialog');
    component.noEscape = true;
    component.setNoEscape = true;
    expect(component.noEscape).toBe(true);
    component.onKeydownHandler(event);
    expect(closeDialogSpy).not.toHaveBeenCalled();
  });
});
