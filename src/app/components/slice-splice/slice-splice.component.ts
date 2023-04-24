import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries/countries.service';

@Component({
  selector: 'slice-splice',
  template: ''
})
export class SliceSpliceComponent implements OnInit {
  countries: any = {};
  selectedCountry: any = [];
  tags: any = {
    flags: ['includes()', 'new Set()', '...spread', 'array.forEach()', 'array.push()', 'async/await', 'service', 'observable', 'subscribe']
  }

  constructor(private countriesService: CountriesService) {}

  ngOnInit() {
    this.countriesService.getCountries().subscribe((c: any) => { this.countries = c });
  }

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
