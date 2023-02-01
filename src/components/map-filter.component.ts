import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountriesService } from 'src/services/countries.service';

@Component({
  selector: 'map-filter',
  template: ''
})
export class MapFilterComponent implements OnInit, OnDestroy {
  sub: Subscription;
  countries: any = {};
  selectedCountry: any = [];

  constructor(private serv: CountriesService) {}

  ngOnInit() { this.sub = this.serv.getCountries().subscribe((c: any) => { this.countries = c }) }

  ngOnDestroy() { this.sub.unsubscribe() }

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
