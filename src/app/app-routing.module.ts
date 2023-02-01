import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Base64Component } from './components/img-base64/img-base64.component';

const routes: Routes = [
  { path: '', component: Base64Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
