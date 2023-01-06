import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Store } from 'src/app/services/store/store.service';

import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  let component: ChildComponent,
      fixture: ComponentFixture<ChildComponent>,
      store: Store,
      payload: any = [
        { id: 1, text: 'payload: 1' },
        { id: 2, text: 'payload: 2' },
        { id: 3, text: 'payload: 3' },
        { id: 4, text: 'payload: 4' },
        { id: 5, text: 'payload: 5' }
      ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChildComponent],
      providers: [Store]
    }).compileComponents();

    fixture = TestBed.createComponent(ChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
    store.store.set('payload', payload);
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should test ngOnInit', () => {
    let spyNgOnInit = spyOn(component, 'ngOnInit');
    spyNgOnInit();
    expect(spyNgOnInit).toHaveBeenCalled();
    component.blee$ = of(store.store.get('payload')).subscribe((b: any) => component.blee = b);
    expect(component.blee).toEqual(payload);
  });

  it('should test setMap', () => {
    component.blee = payload;
    component.setMap();
    component.blee.push({ id: component.blee.length + 1, text: `payload: ${ component.blee.length + 1 }` });
    store.store.set('blee', component.blee);
    expect(component.blee).toEqual(component.blee);
  });
});
