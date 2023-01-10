import { TestBed } from '@angular/core/testing';
import { Store } from './store.service';

describe('Store', () => {
  let serv: Store;

  beforeEach(() => {
    serv = TestBed.inject(Store);
    serv.set('ids', [{ 'id': 1 }]);
    serv._s$.next(serv.m.get('ids'));
    serv.add('ids', { 'id': 2 });
  });

  afterEach(() => serv._s$.unsubscribe());

  it('create the store', () => expect(serv).toBeTruthy());

  it('should SET item', () => expect(serv.m.get('ids')).toEqual([{ 'id': 1 }, { 'id': 2 }]));

  it('should GET item', () => serv.get('ids').subscribe((id: any) => expect(id).toEqual([{ 'id': 1 }, { 'id': 2 }])));

  it('should ADD item', () => serv.get('ids').subscribe((id: any) => expect(id).toEqual([{ 'id': 1 }, { 'id': 2 }])));

  it('should REMOVE item', () => {
    serv.remove('ids', 1);
    serv.get('ids').subscribe((id: any) => expect(id).toEqual([{ 'id': 1 }]));
  });

  it('should REMOVE item by Key', () => {
    serv.removeByKey('ids', 'id', 2);
    serv.get('ids').subscribe((id: any) => expect(id).toEqual([{ 'id': 1 }]));
  });
});
