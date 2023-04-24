import { UnsubComponent } from './unsub.component';
import { of } from 'rxjs';

describe('UnsubComponent', () => {
  let component: UnsubComponent = new UnsubComponent;

  it('call ngOnInit,add sub and ngOnDestroy', () => {
    component.ngOnInit();
    component.addSub(of([1, 2]).subscribe());
    component.ngOnDestroy();
    expect(component).toBeTruthy();
  });
});
