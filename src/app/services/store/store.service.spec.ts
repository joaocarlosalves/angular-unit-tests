import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Store } from './store.service';

describe('Store', () => {
  let serv: Store;

  beforeEach(() => {
    serv = TestBed.inject(Store);
    serv.set('id', { id: 1 });
  });

  it('create the store', () => expect(serv).toBeTruthy());

  it('should SET item',  () => expect(serv.m.get('id')).toEqual({ id: 1 }));

  it('should GET item',  () => serv.get('id').subscribe(id => expect(id).toEqual({ id: 1 })));

  it('should ADD item',  () => {
    //
    serv.set('id', { id: 1 });

    serv._s$.next(serv.m.get('id'));

    serv.get('id').subscribe(id => {
      console.log(id)
      expect(id).toEqual({ id: 1 }, { id: 2 })
    })

    expect(serv.m.get('id')).toEqual({ id: 1 }, { id: 2 })
  });
});
