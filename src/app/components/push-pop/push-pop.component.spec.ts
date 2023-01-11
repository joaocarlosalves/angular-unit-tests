import { PushPopComponent } from './push-pop.component';

describe('PushPopComponent', () => {
  let component: PushPopComponent;

  beforeEach(() => {
    component = new PushPopComponent();
    component.list = [1, 2, 3];
  });

  it('should test pop()', () => {
    component.pop();
    expect(component.list).toEqual([1, 2]);
  });

  it('should test removeFromList()', () => {
    component.removeFromList(2);
    expect(component.list).toEqual([1, 2]);
  });

  it('should test addToListInput()', () => {
    component.addToListInput(4);
    component.addToListInput({ key: 'Enter', target: { value: 4 } });
    expect(component.list).toEqual([ 1, 2, 3, 4 ]);
  });

  it('should test addToList()', () => {
    component.addToList('hi');
    expect(component.list).toEqual([ 1, 2, 3, 'hi' ]);
  });
});
