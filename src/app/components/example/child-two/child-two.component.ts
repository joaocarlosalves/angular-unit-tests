import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from 'src/app/services/store/store.service';

@Component({
  selector: 'child-two',
  template: `
    <div style="margin: 10%">
      <button (click)="setMap()">add to store setMap</button>

      <span>{{ blee }}</span>
    </div>
  `
})
export class ChildTwoComponent implements OnInit, OnDestroy {
  blee: any[] = [];

  blee$: Subscription;
  //blee$: Observable<any> = this.store.get('blee');

  constructor(private store: Store) {}

  ngOnInit() {
    this.blee$ = this.store.get('blee').subscribe((blee: any) => this.blee = blee);
  }

  ngOnDestroy() { this.blee$.unsubscribe() }

  setMap() {
    this.blee.push({ id: this.blee.length + 1, text: `blee: ${ this.blee.length + 1 }` });
    this.store.set('blee', this.blee);
  }
}
