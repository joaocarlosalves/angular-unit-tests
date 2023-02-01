import { of } from 'rxjs';
import { PAYLOAD } from 'src/app/mocks/payload.mock';
import { Store } from 'src/app/services/store/store.service';
import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  let component: ChildComponent;

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj<Store>(['get', 'set']);
    storeSpy.get.and.returnValue(of(PAYLOAD));
    component = new ChildComponent(storeSpy);
    component.setMap();
    component.ngOnInit();
  });

  afterEach(() => component.ngOnDestroy());

  it('should test setMap', () => expect(component.blee).toEqual(PAYLOAD));
});
