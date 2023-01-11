import { of } from 'rxjs';
import { PAYLOAD } from 'src/app/mocks/payload.mock';
import { Store } from 'src/app/services/store/store.service';
import { ExampleComponent } from './example.component';

describe('ExampleComponent', () => {
  let component: ExampleComponent;

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj<Store>(['get', 'set']);
    storeSpy.get.and.returnValue(of(PAYLOAD));
    component = new ExampleComponent(storeSpy);
  });

  it('should test setMap', () => {
    component.setMap();
    expect(component.list).toEqual(PAYLOAD);
  });
});
