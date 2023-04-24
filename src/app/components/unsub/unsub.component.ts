import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({ selector: 'unsub', template: '' })
export class UnsubComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  ngOnInit(): void {}
  ngOnDestroy() { this.subs.forEach(subs => subs.unsubscribe()) }
  addSub(subs: Subscription) { this.subs.push(subs) }
}
