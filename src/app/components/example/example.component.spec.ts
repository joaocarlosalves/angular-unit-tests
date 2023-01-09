import { ExampleComponent } from './example.component';
import { of } from 'rxjs';
import { Store } from 'src/app/services/store/store.service';

describe('ExampleComponent', () => {
  let component: ExampleComponent,
      payload: any = [
        { id: 1, text: 'payload: 1' },
        { id: 2, text: 'payload: 2' },
        { id: 3, text: 'payload: 3' },
        { id: 4, text: 'payload: 4' },
        { id: 5, text: 'payload: 5' }
      ];

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj<Store>(['get', 'set']);
    storeSpy.get.and.returnValue(of(payload));
    component = new ExampleComponent(storeSpy);
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should test setMap', () => {
    component.list = payload;
    component.setMap();
    component.list.push({ id: component.list.length + 1, text: `payload: ${ component.list.length + 1 }` });
    expect(component.list).toEqual(component.list);
  });
});
