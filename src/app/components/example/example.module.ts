import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildComponent } from './child/child.component';
import { ExampleComponent } from './example.component';
import { ChildTwoComponent } from './child-two/child-two.component';

@NgModule({
  declarations: [
    ExampleComponent,
    ChildComponent,
    ChildTwoComponent
  ],
  imports: [CommonModule],
  exports: [
    ExampleComponent,
    ChildComponent,
    ChildTwoComponent
  ]
})
export class ExampleModule { }
