import { of } from 'rxjs';
import { Store } from 'src/app/services/store/store.service';
import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  let component: ChildComponent,
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
    component = new ChildComponent(storeSpy);
    component.ngOnInit();
  });

  afterEach(() => component.ngOnDestroy());

  it('should create', () => expect(component).toBeTruthy());

  it('should test setMap', () => {
    component.blee = payload;
    component.setMap();
    component.blee.push({ id: component.blee.length + 1, text: `payload: ${ component.blee.length + 1 }` });
    expect(component.blee).toEqual(component.blee);
  });
});
