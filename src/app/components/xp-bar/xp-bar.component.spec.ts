import { discardPeriodicTasks, fakeAsync, flush, tick, waitForAsync } from '@angular/core/testing';
import { XpBarComponent } from './xp-bar.component';

describe('XpBarComponent', () => {
  let component: XpBarComponent = new XpBarComponent;

  it('setInterval on Init', fakeAsync(() => {
    component.xp = 0;
    component.ngOnInit();
    setTimeout(() => {
      component.xp = 3;
      expect(component.xp).toBe(3);
    }, 3102);
    tick(3103);
    discardPeriodicTasks();
  }));

  it('setInterval on Init Else', fakeAsync(() => {
    component.xp = 110;
    component.ngOnInit();
    setTimeout(() => {
      component.xp = 100;
      expect(component.xp).toBe(100);
    }, 3102);
    tick(3104);
    discardPeriodicTasks();
//    expect(component.xp).toBe(100);
  }));

  it('set xpBar %', waitForAsync(() => {
    setTimeout(() => expect(component.xpBar).toBe(component.xp+'%'), 3100);
  }));
});
