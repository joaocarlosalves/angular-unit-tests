import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountrySelectComponent } from './country-select.component';
import { currencies } from './currencies';
import { countries } from './countries';

describe('CountrySelectComponent', () => {
  let component: CountrySelectComponent,
      fixture: ComponentFixture<CountrySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ declarations: [CountrySelectComponent] }).compileComponents();
    fixture = TestBed.createComponent(CountrySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the component with default values', () => {
    expect(component.activeBtn).toBe('empty');
    expect(component.grid).toBe('row');
    expect(component.country).toBe('Selecione...');
    expect(component.opened).toBe(false);
    expect(component.right).toBe(false);
    expect(component.currency).toBe(false);
    expect(component.countriesList).toEqual(countries);
  });

  it('should set the right property based on @Input', () => {
    component.setRight = true;
    fixture.detectChanges();
    expect(component.right).toBe(true);

    component.setRight = '';
    fixture.detectChanges();
    expect(component.right).toBe(true);
  });

  it('should not change the value of opened when a different key is pressed', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.onKeydownHandler.call(component, event);
    expect(component.opened).toBe(false);
  });

  it('should set opened to false when Escape key is pressed', () => {
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    component.onKeydownHandler.call(component, event);
    expect(component.opened).toBe(false);
  });

  it('should return the country name without parentheses', () => {
    const countryName = 'United States (USA)';
    const formattedName = component.formatCountryName(countryName);
    expect(formattedName).toBe('United States ');
  });

  it('should return the original country name if there are no parentheses', () => {
    const countryName = 'Brazil';
    const formattedName = component.formatCountryName(countryName);
    expect(formattedName).toBe('Brazil');
  });


  it('should handle nested parentheses and return the outermost name', () => {
    const countryName = 'Country (Region (City))';
    const formattedName = component.formatCountryName(countryName);
    expect(formattedName).toBe('Country ');
  });

  it('should handle empty input and return an empty string', () => {
    const countryName = '';
    const formattedName = component.formatCountryName(countryName);
    expect(formattedName).toBe('');
  });

  it('should return an empty list if no match is found', () => {
    const event = 'xyz';
    const filteredList = component.returnFilteredList(event, countries);
    expect(filteredList.length).toBe(0);
  });

  it('should handle empty input and return the original list', () => {
    const event = '';
    const filteredList = component.returnFilteredList(event, countries);
    expect(filteredList).toEqual(countries);
  });

  it('should return an empty list if no match is found', () => {
    const event = 'xyz';
    const filteredList = component.returnFilteredList(event, countries);
    expect(filteredList.length).toBe(0);
  });

  it('should set currency to true when input value is true', () => {
    component.currency = true;
    expect(component.currency).toBe(true);
  });

  it('should set currency to false when input value is false', () => {
    component.currency = false;
    expect(component.currency).toBe(false);
  });

  it('should set countriesList to countries when currency is false and event length is 2 or less', () => {
    component.currency = false;
    const event = 'Br';
    component.searchCountry.call(component, event);
    expect(component.countriesList).toEqual(countries);
  });

  it('should set countriesList to countries when currency is true and event length is 2 or less', () => {
    component.currency = true;
    const event = 'USD';
    component.searchCountry.call(component, event);
    let spy = spyOn(component, 'returnFilteredList');
    spy(event, currencies);
    expect(spy).toHaveBeenCalledWith(event, currencies);
  });

  it('should set countriesList to the filtered list of currencies when currency is true', () => {
    const event = 'CAD';
    component.currency = true;
    component.mountCountriesList.call(component, event);
    let spy = spyOn(component, 'returnFilteredList');
    spy(event, currencies);
    expect(spy).toHaveBeenCalledWith(event, currencies);
  });

  it('should set countriesList to the filtered list of currencies when currency is true', () => {
    const event = 'Bra';
    component.currency = false;
    component.mountCountriesList.call(component, event);
    let spy = spyOn(component, 'returnFilteredList');
    spy(event, countries);
    expect(spy).toHaveBeenCalledWith(event, countries);
  });

  it('should set activeBtn, country, and emit selected country when currency is false', () => {
    component.currency = false;
    let spy = spyOn(component, 'selectCountry');
    spy('USA');
    let spy2 = spyOn(component, 'formatCountryName');
    spy2('united states');
    expect(spy2).toHaveBeenCalledWith('united states');
    expect(spy).toHaveBeenCalledWith('USA');
  });

  it('should set opened to false if the click is outside the element', () => {
    component.opened = true;
    const fakeEvent = { target: document.createElement('div') };
    component.clickout(fakeEvent);
    expect(component.opened).toBe(false);
  });

  it('should not change opened if the click is inside the element', () => {
    component.opened = true;
    const fakeEvent = { target: component.elem.nativeElement };
    component.clickout(fakeEvent);
    expect(component.opened).toBe(true);
  });

  it('should set currency to true if input is an empty string', () => {
    component.setCurrency = '';
    expect(component.currency).toBeTrue();
  });

  it('should set currency to false if input is false', () => {
    component.setCurrency = false;
    expect(component.currency).toBeFalse();
  });

  it('should set currency to false if input is anything other than an empty string or true', () => {
    component.setCurrency = true;
    expect(component.currency).toBeTrue();
  });

  it('should set countriesList to the filtered list of currencies when currency is true', () => {
    component.currency = true;
    let spy = spyOn(component, 'returnFilteredList');
    spy('CAD', currencies);
    component.countriesList = spy;
    expect(spy).toHaveBeenCalledWith('CAD', currencies);
    let reset = spyOn(component, 'reset');
    reset();
    expect(reset).toHaveBeenCalled();
  });

  it('should call mountCountriesList if the search input length is greater than 2', () => {
    spyOn(component, 'mountCountriesList');
    component.searchCountry({ length: 3 });
    expect(component.mountCountriesList).toHaveBeenCalled();
  });

  it('should set countriesList to countries if the search input length is less than or equal to 2 and currency is false', () => {
    component.currency = false;
    component.searchCountry({ length: 2 });
    expect(component.countriesList).toEqual(countries);
  });

  it('should set countriesList to currencies if the search input length is less than or equal to 2 and currency is true', () => {
    component.currency = true;
    component.searchCountry({ length: 1 });
    expect(component.countriesList).toEqual(currencies);
  });

  it('should reset countriesList, activeBtn, and country properties', () => {
    component.currency = true;
    component.countriesList = [];
    component.activeBtn = 'some-value';
    component.country = 'some-country';
    component.reset();
    expect(component.countriesList).toEqual(currencies);
    expect(component.activeBtn).toBe('empty');
    expect(component.country).toBe('Selecione...');
  });

  it('should set countriesList to countries when currency is false', () => {
    component.currency = false;
    component.reset();
    expect(component.countriesList).toEqual(countries);
  });

  it('should set activeBtn and country properties correctly and emit the selected currency', () => {
    const mockCurrency = {
      codeISOAlphaTwo: 'USD',
      currencyAcronyum: 'USD',
      name: 'dollar',
      currencyName: 'Dollar',
    };
    component.currency = true;
    const emitSpy = spyOn(component.getSelectedCountry, 'emit');
    component.selectCountry(mockCurrency);
    expect(component.activeBtn).toBe('USD');
    expect(component.country).toBe('dollar');
    expect(emitSpy).toHaveBeenCalledWith(mockCurrency);
  });

  it('should set activeBtn and country properties correctly and emit the selected country', () => {
    const mockCountry = {
      codeISOAlphaTwo: 'US',
      currencyAcronyum: 'USD',
      name: 'United States',
      currencyName: 'Dollar',
    };
    const emitSpy = spyOn(component.getSelectedCountry, 'emit');
    component.currency = false;
    component.selectCountry(mockCountry);
    expect(component.activeBtn).toBe('US');
    expect(component.country).toBe('united states');
    expect(emitSpy).toHaveBeenCalledWith(mockCountry);
  });
});


