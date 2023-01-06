import { Component } from '@angular/core';
import { Store } from 'src/app/services/store/store.service';

@Component({
  selector: 'example',
  templateUrl: './example.component.html'
})
export class ExampleComponent {
  list: any[] = [
    { id: 1, text: 'example: 1' },
    { id: 2, text: 'example: 2' },
    { id: 3, text: 'example: 3' },
    { id: 4, text: 'example: 4' },
    { id: 5, text: 'example: 5' }
  ];

  opened = false;

  constructor(public store: Store) { this.store.set('example', this.list) }

  setMap() {
    this.list.push({ id: this.list.length + 1, text: `example: ${ this.list.length + 1 }` });
    this.store.set('example', this.list);
  }
}
