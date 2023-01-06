import { TestBed } from '@angular/core/testing';
import { Store } from './store.service';

describe('Store', () => {
  let serv: Store;

  beforeEach(() => {
    serv = TestBed.inject(Store);
    serv.set('id', { id: 1 });
  });

  it('create the store', () => expect(serv).toBeTruthy());
  it('should SET item',  () => expect(serv.store.get('id')).toEqual({ id: 1 }));
  it('should GET item',  () => serv.get('id').subscribe(id => expect(id).toEqual({ id: 1 })));
});
