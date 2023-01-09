import { Component } from '@angular/core';

@Component({
  selector: 'push-pop',
  template: `
    <div class="full flex column gap-10px mt30px">
      <label>Add Item</label>

      <div class="flex center gap-10px">
        <input class="p-input" type='text' #inp (keyup)="addToListInput($event)" />
        <button *ngIf="inp.value.length > 0" class="p-button success" style="height: 35px" (click)="addToList(inp.value); inp.focus()">ADD</button>
        <button *ngIf="list.length > 0" class="p-button regular" style="height: 35px" (click)="pop(); inp.focus()">POP</button>
      </div>

      <div class="full flex-wrap gap-30px overflow-auto list-container" *ngIf="list.length > 0">
        <span *ngFor="let item of list; let i = index" class="list-item" (click)="removeFromList(i)">{{ item }}</span>
      </div>

      <div class='full mt20px'>
        <span class="full flex-wrap gap-10px center">
          <b>Used:</b>
          <span *ngFor="let tag of tags.flags" class='tag'>{{ tag }}</span>
        </span>
      </div>
    </div>
  `,
  styles: [`
    input[type='text'] { max-width: 300px }
    .list-item {
      padding: 5px 15px;
      cursor: pointer;
      font-size: 15px;
      transition: all .2s ease-in-out;
      font-weight: bold
    }
    .list-item:hover { background-color: var(--yellow) }
    .list-container { max-height: 300px }
  `]
})
export class PushPopComponent {
  list: any[] = [];
  tags: any = {
    flags: ['array.push()', 'array.pop()', 'array.splice()', 'new Set()']
  }

  addToList(value?: string) {
    let list: any = this.list;
    list.push(value);
    this.list = [...new Set(list)];
  }

  addToListInput(event: any) { if(event.key === 'Enter') this.addToList(event.target.value) }

  removeFromList(index: number) { this.list.splice(index, 1) }

  pop() { this.list.pop() }
}
