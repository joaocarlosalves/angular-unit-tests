import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Store } from './services/store/store.service';
import { SwitchMapComponent } from './components/switch-map/switch-map.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [AppComponent, SwitchMapComponent, FormComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule { }
