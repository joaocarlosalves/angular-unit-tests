import { PushPopComponent } from './push-pop.component';

describe('PushPopComponent', () => {
  let component: PushPopComponent;

  beforeEach(async () => {
    component = new PushPopComponent();
    component.list = [1, 2, 3];
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should test pop()', () => {
    component.pop();
    expect(component.list).toEqual([1, 2]);
  });

  it('should test removeFromList()', () => {
    component.removeFromList(2);
    expect(component.list).toEqual([1, 2]);
  });

  it('should test addToListInput()', () => {
    let spy = spyOn(component, 'addToList'),
        event: any = { key: 'Enter', target: { value: 'bra' } };
    component.addToListInput('bra');
    spy('bra');
    component.addToListInput(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should test addToList()', () => {
    component.list = [];
    let list: any = component.list;
    component.addToList('2');
    list.push('2');
    component.list = [...new Set(list)];
    expect(component.list).toEqual(['2']);
  });
});
