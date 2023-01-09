import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'map-filter',
  template: `
    <div class="full flex column gap-10px mt30px">
      <label>Add Item</label>
      <input class="p-input" type='text' (keyup)="searchCountry($event)" />
    </div>
  `,
  styles: [`
    .flag { width: 30px; height: 22px }
    input[type='text'] { max-width: 300px }
  `]
})
export class MapFilterComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  countries: any = {};
  selectedCountry: any = [];

  constructor(private countriesService: CountriesService) {}

  ngOnInit() {
    this.subscription = this.countriesService.getCountries().subscribe((c: any) => { this.countries = c });
  }

  ngOnDestroy() { this.subscription.unsubscribe() }

  searchCountry(event: any) {
    if(event.target.value.length < 2) setTimeout(() => this.selectedCountry = [], 500);
    else setTimeout(() => this.getCountry(event.target.value), 100);
  }

  async getCountry(country: string) {
    let countries: any = [];
    await this.countries.forEach((cd: any) => {
      if(cd.country.toLowerCase().includes(country.toLowerCase())) countries.push(cd);
    });
    this.selectedCountry = await [...new Set(countries)];
  }
}
