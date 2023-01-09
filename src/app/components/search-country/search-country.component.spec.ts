import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CountriesService } from 'src/app/services/countries.service';
import { SearchCountryComponent } from './search-country.component';
import { COUNTRIES } from 'src/app/mocks/countries.mock';
import { of } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

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
    component = new SearchCountryComponent(serv);
    serv = TestBed.inject(CountriesService);
  });

  afterEach(() => component.ngOnDestroy());

  it('should create', () => expect(component).toBeTruthy());

  it('should test ngOnInit', () => {
    let init = spyOn(component, 'ngOnInit');
    init();
    expect(init).toHaveBeenCalled();
  });


  it('should test insertPost(body)', async () => {
    let req = await httpMock.expectOne('http://localhost:3000/countries');
    expect(req.request.method).toEqual('GET');
    req.flush(req);
  });



  it('should call getCountries method of countriesService', () => {
    of(COUNTRIES).subscribe((c: any) => {
      serv._countries$.next(c);
      component.countries = c;
      serv.getCountries();
    });
    serv.getCountries()
    .pipe(takeWhile(() => component.unsub))
    .subscribe((c: any) => {
      expect(component.unsub).toBeTruthy();
      component.countries = c;
      expect(component.countries).toEqual(c);
    });

    component.ngOnInit();

  });


  it('should set selectedCountry to an empty array if the search term is less than two characters',
  fakeAsync(async () => {
    component.searchCountry({ target: { value: 'a' } });
    tick(501);
    component.selectedCountry = [];
    expect(component.selectedCountry).toEqual([]);
  }));


  it('should set selectedCountry to an empty array if the search term is more than two characters',
  fakeAsync(async () => {
    of(COUNTRIES).subscribe((c: any) => component.countries = c);

    component.searchCountry({ target: { value: 'braz' } });
    tick(101);

    let spyGetCountry = spyOn(component, 'getCountry');

    of(spyGetCountry('braz')).subscribe((c: any) => {
      component.countries = c;
      expect(component.countries).toEqual(c);
    });

    component.selectedCountry = [{ "country": "Brazil", "id": "BR" }];

    expect(spyGetCountry).toHaveBeenCalledWith('braz');
    expect(component.getCountry).toHaveBeenCalledWith('braz');
    expect(component.selectedCountry).toEqual([{ "country": "Brazil", "id": "BR" }]);
  }));
});
