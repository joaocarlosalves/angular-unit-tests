import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountriesService  {
  public _countries$ = new ReplaySubject(1);
  url: string = 'http://localhost:3000/countries';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  countries: any = {};

  constructor(private httpClient: HttpClient) {
    this.httpClient.get(this.url).subscribe((c: any) => {
      this.countries = c;
      this._countries$.next(this.countries);
    });
  }

  getCountries() { return this._countries$ }

  getCountry(country: string) {
    let countries: any = [], _country$ = new ReplaySubject(1);
    this.getCountries().subscribe((c: any) => {
      this.countries = c;
      this.countries.forEach((cd: any) => { if(cd.country.toLowerCase().includes(country.toLowerCase())) countries.push(cd) });
      _country$.next([...new Set(countries)]);
    })
    return _country$;
  }

  getCountriesArray() {
    let countries: any = [], _countries$ = new ReplaySubject(1);
    this.getCountries().subscribe((c: any) => {
      this.countries = c;
      this.countries.forEach((cd: any) => countries.push(cd.country));
      _countries$.next(countries);
    })
    return _countries$;
  }
}
