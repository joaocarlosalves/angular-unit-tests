import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleComponent } from './example.component';
import { Store } from 'src/app/services/store/store.service';

describe('ExampleComponent', () => {
  let component: ExampleComponent,
      fixture: ComponentFixture<ExampleComponent>,
      store: Store;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ExampleComponent);
    store = TestBed.inject(Store);
    component = fixture.componentInstance;
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should test setMap', () => {
    component.list = [
      { id: 1, text: 'example: 1' },
      { id: 2, text: 'example: 2' },
      { id: 3, text: 'example: 3' },
      { id: 4, text: 'example: 4' },
      { id: 5, text: 'example: 5' }
    ];
    component.setMap();
    component.list.push({ id: component.list.length + 1, text: `example: ${ component.list.length + 1 }` });
    store.store.set('example', component.list);
    expect(component.list).toEqual(component.list);
  });
});
