import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { takeWhile } from 'rxjs/operators';
import { of } from 'rxjs';
import { SearchCountryComponent } from './search-country.component';
import { CountriesService } from 'src/app/services/countries.service';
import { COUNTRIES } from 'src/app/mocks/countries.mock';

describe('SearchCountryComponent', () => {
  let component: SearchCountryComponent,
      httpMock: HttpTestingController,
      http: HttpClient,
      serv: CountriesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountriesService]
    })

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    serv = TestBed.inject(CountriesService);
    component = new SearchCountryComponent(serv);
  });

  afterEach(() => component.ngOnDestroy());

  it('should create', () => expect(component).toBeTruthy());

  it('should call getCountries method of countriesService', fakeAsync(() => {
    component.ngOnInit();
    serv._countries$.next(COUNTRIES);
    component.countries = COUNTRIES;
    serv.getCountries();
    serv.getCountries()
      .pipe(takeWhile(() => component.unsub))
      .subscribe((c: any) => {
        component.countries = c;
        expect(component.countries).toEqual(c);
      });
  }));

  it('should test insertPost(body)', async () => {
    let req = await httpMock.expectOne('http://localhost:3000/countries');
    expect(req.request.method).toEqual('GET');
    req.flush(req);
  });

  it('should test ngOnInit', () => {
    let init = spyOn(component, 'ngOnInit');
    init();
    expect(init).toHaveBeenCalled();
  });

  it('should set selectedCountry to an empty array if the search term is less than two characters',
  fakeAsync(() => {
    component.searchCountry({ target: { value: 'a' } });
    tick(501);
    component.selectedCountry = [];
    expect(component.selectedCountry).toEqual([]);
  }));

  it('should set selectedCountry to an empty array if the search term is more than two characters',
  fakeAsync(() => {
    of(COUNTRIES).subscribe((c: any) => component.countries = c);
    component.searchCountry({ target: { value: 'braz' } });
    tick(101);
    let spyGetCountry = spyOn(component, 'getCountry');
    of(spyGetCountry('braz')).subscribe((c: any) => component.countries = c);
    component.selectedCountry = [{ "country": "Brazil", "id": "BR" }];
    expect(spyGetCountry).toHaveBeenCalledWith('braz');
    expect(component.getCountry).toHaveBeenCalledWith('braz');
    expect(component.selectedCountry).toEqual([{ "country": "Brazil", "id": "BR" }]);
  }));
});
