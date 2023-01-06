import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Store {
  public store = new Map();
  public _store$ = new BehaviorSubject<any>(0);

  set(item: any, payload: any) { this.store.set(item, payload) }

  get(item: any) {
    this._store$.next(this.store.get(item));
    return this._store$.asObservable();
  }
}
