import { currencies } from './currencies';
import { Component, EventEmitter, Input, Output, HostListener, OnInit, ElementRef } from '@angular/core';
import { countries } from './countries';

@Component({
  selector: 'country-select',
  template: ''
})
export class CountrySelectComponent implements OnInit {
  activeBtn: string = 'empty';
  grid: string = 'row';
  country: string = 'Selecione...';
  opened: boolean = false;
  right: boolean = false;
  currency: boolean = false;
  @Input() countriesList: any = [];
  @Input('right') set setRight(s: boolean | '') { this.right = s === '' || s }
  @Input('currency') set setCurrency(c: boolean | '') { this.currency = c === '' || c }
  @Output() getSelectedCountry = new EventEmitter();
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Escape') this.opened = false;
  }
  @HostListener('document:mousedown', ['$event']) clickout(event: any) {
    if (!this.elem.nativeElement.contains(event.target)) this.opened = false;
  }

  constructor(public elem: ElementRef) {}

  ngOnInit() { this.reset() }

  searchCountry(event: any) {
    event.length > 2
      ? this.mountCountriesList(event)
      : (this.countriesList = !this.currency ? countries : currencies);
  }

  mountCountriesList(event: any) {
    this.countriesList = !this.currency
      ? this.returnFilteredList(event, countries)
      : this.returnFilteredList(event, currencies);
  }

  returnFilteredList(event: any, list: any) {
    return list.filter((e: any) => {
      if(e[!this.currency ? 'name' : 'currencyName'].toLowerCase().includes(event.toLowerCase())) return e;
    });
  }

  formatCountryName(country: any) { return country.split('(')[0] }

  reset() {
    this.countriesList = !this.currency ? countries : currencies;
    this.activeBtn = 'empty';
    this.country = 'Selecione...';
  }

  selectCountry(c: any) {
    this.activeBtn = c[!this.currency ? 'codeISOAlphaTwo' : 'currencyAcronyum'].toString().toUpperCase();
    this.country = this.formatCountryName(!this.currency ? c.name : c.currencyName).toLowerCase();
    this.getSelectedCountry.emit(c);
  }
}
