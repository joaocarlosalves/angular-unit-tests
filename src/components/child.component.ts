import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from 'src/services/store.service';

@Component({
  selector: 'child',
  template: ''
})
export class ChildComponent implements OnInit, OnDestroy {
  blee: any[] = [];
  blee$: Subscription;

  constructor(private store: Store) {}

  ngOnInit() { this.blee$ = this.store.get('blee').subscribe((blee: any) => this.blee = blee) }

  ngOnDestroy() { this.blee$.unsubscribe() }

  setMap() {
    this.blee.push({ id: this.blee.length + 1, text: `blee: ${ this.blee.length + 1 }` });
    this.store.set('blee', this.blee);
  }
}
