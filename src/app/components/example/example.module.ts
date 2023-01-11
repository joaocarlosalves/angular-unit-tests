import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildComponent } from './child/child.component';
import { ExampleComponent } from './example.component';

@NgModule({
  declarations: [
    ExampleComponent,
    ChildComponent
  ],
  imports: [CommonModule],
  exports: [
    ExampleComponent,
    ChildComponent
  ]
})
export class ExampleModule { }
