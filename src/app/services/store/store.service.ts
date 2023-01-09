import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Store {
  m = new Map();
  _s$ = new BehaviorSubject<any>(0);

  set(i: string, p: any) { this.m.set(i, p) }

  add(i: string, p: any) { this.m.get(i).push(p) }

  remove(i: string, x: any) { this.m.get(i).splice(x, 1) }

  removeByKey(i: string, k: string, v: any) { this.m.get(i).forEach((j: any, x: any) => { if(j[k] == v) this.remove(i, x) }) }

  get(i: string) {
    this._s$.next(this.m.get(i));
    return this._s$.asObservable();
  }
}
