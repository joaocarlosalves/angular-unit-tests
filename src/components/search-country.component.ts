import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountriesService } from 'src/services/countries.service';
import { takeWhile } from "rxjs/operators"

@Component({
  selector: 'search-country',
  template: ''
})
export class SearchCountryComponent implements OnInit, OnDestroy {
  unsub: boolean = true;
  countries: any = {};
  selectedCountry: any = [];

  constructor(private countriesService: CountriesService) {}

  ngOnInit() {
     this.countriesService.getCountries()
     .pipe(takeWhile(() => this.unsub))
     .subscribe((c: any) => this.countries = c);
  }

  ngOnDestroy() { this.unsub = false }

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
