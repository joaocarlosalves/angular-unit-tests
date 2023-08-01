import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsLegendsComponent } from './details-legends.component';

describe('DetailsLegendsComponent', () => {
  let component: DetailsLegendsComponent,
      fixture: ComponentFixture<DetailsLegendsComponent>,
      mousedownEvent = new MouseEvent('mousedown', { bubbles: true }),
      fakeTarget = document.createElement('div');

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [DetailsLegendsComponent] }).compileComponents();
    fixture = TestBed.createComponent(DetailsLegendsComponent);
    component = fixture.componentInstance;
    spyOn(component.isClosed, 'emit');
  });

  it('should emit isClosed event when Escape key is pressed', () => {
    component.onKeydownHandler(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(component.isClosed.emit).toHaveBeenCalledWith(true);
  });

  it('should not emit isClosed event when a key other than Escape is pressed', () => {
    component.onKeydownHandler(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(component.isClosed.emit).not.toHaveBeenCalled();
  });

  it('should emit isClosed event when clicked outside the component', () => {
    document.body.appendChild(fakeTarget);
    fakeTarget.dispatchEvent(mousedownEvent);
    component.clickout(mousedownEvent);
    expect(component.isClosed.emit).toHaveBeenCalledWith(true);
    document.body.removeChild(fakeTarget);
  });

  it('should not emit isClosed event when clicked inside the component', () => {
    component.elem.nativeElement.appendChild(fakeTarget);
    fakeTarget.dispatchEvent(mousedownEvent);
    component.clickout(mousedownEvent);
    expect(component.isClosed.emit).not.toHaveBeenCalled();
    component.elem.nativeElement.removeChild(fakeTarget);
  });
});
