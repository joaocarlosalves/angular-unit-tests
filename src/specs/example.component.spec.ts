import { of } from 'rxjs';
import { PAYLOAD } from 'src/mocks/payload.mock';
import { Store } from 'src/services/store.service';
import { ExampleComponent } from '../components/example.component';

describe('ExampleComponent', () => {
  let component: ExampleComponent;

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj<Store>(['get', 'set']);
    storeSpy.get.and.returnValue(of(PAYLOAD));
    component = new ExampleComponent(storeSpy);
    component.setMap();
  });

  it('should test setMap', () => expect(component.list).toEqual(PAYLOAD));
});
