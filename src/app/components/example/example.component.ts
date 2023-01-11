import { Component } from '@angular/core';
import { Store } from 'src/app/services/store/store.service';
import { PAYLOAD } from 'src/app/mocks/payload.mock'

@Component({
  selector: 'example',
  template: ''
})
export class ExampleComponent {
  list: any[] = PAYLOAD;
  opened = false;

  constructor(public store: Store) { this.store.set('example', this.list) }

  setMap() {
    this.list.push({ id: this.list.length + 1, text: `example: ${ this.list.length + 1 }` });
    this.store.set('example', this.list);
  }
}
