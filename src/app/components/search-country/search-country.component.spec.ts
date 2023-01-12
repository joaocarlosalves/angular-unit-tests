import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { SearchCountryComponent } from './search-country.component';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { COUNTRIES } from 'src/app/mocks/countries.mock';

describe('SearchCountryComponent', () => {
  let component: SearchCountryComponent,
      httpMock: HttpTestingController,
      http: HttpClient,
      serv: CountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    serv = TestBed.inject(CountriesService);
    component = new SearchCountryComponent(serv);
    component.ngOnInit();
  });

  afterEach(() => component.ngOnDestroy());

  it('should test insertPost(body)', async () => {
    let req = await httpMock.expectOne('http://localhost:3000/countries');
    expect(req.request.method).toEqual('GET');
    req.flush(req);
  });

  it('should set selectedCountry to an empty array if the search term is less than two characters',
  fakeAsync(() => {
    component.searchCountry({ target: { value: 'a' } });
    tick(501);
    expect(component.selectedCountry = []).toEqual([]);
  }));

  it('should set selectedCountry to an empty array if the search term is more than two characters',
  fakeAsync(() => {
    of(COUNTRIES).subscribe((c: any) => component.countries = c);
    component.searchCountry({ target: { value: 'braz' } });
    tick(101);
    expect(component.selectedCountry = [{ "country": "Brazil", "id": "BR" }]).toEqual([{ "country": "Brazil", "id": "BR" }]);
  }));
});
