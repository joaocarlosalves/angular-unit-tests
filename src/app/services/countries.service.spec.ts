import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CountriesService } from 'src/app/services/countries.service';
import { of } from 'rxjs';
import { COUNTRIES } from 'src/app/mocks/countries.mock';

describe('CountriesService', () => {
  let serv: CountriesService,
      httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountriesService],
    });

    httpMock = TestBed.inject(HttpTestingController);
    serv = TestBed.inject(CountriesService);
  });

  it('should be created', () => expect(serv).toBeTruthy());

  it('should test insertPost(body)', async () => {
    let req = await httpMock.expectOne('http://localhost:3000/countries');
    expect(req.request.method).toEqual('GET');
    req.flush(req);
  });

  it('should test subscription on ngOnInit', () => {
    of(COUNTRIES).subscribe((c: any) => serv._countries$.next(c));
    serv.getCountries().subscribe((c: any) => {
      serv.countries = c;
      expect(serv.countries).toEqual(c);
    });
  });

  it('should test getCountry', () => {
    let countries: any = [];

    serv.getCountry('braz');

    of(COUNTRIES).subscribe((c: any) => serv._countries$.next(c));
    serv.getCountries().subscribe((c: any) => {
      serv.countries = c;
      expect(serv.countries).toEqual(c);
    });

    serv.countries.forEach((cd: any) => { if(cd.country.toLowerCase().includes('braz'.toLowerCase())) countries.push(cd) });
  });

  it('should test getCountriesArray', () => {
    let countries: any = [];

    serv.getCountriesArray();

    of(COUNTRIES).subscribe((c: any) => serv._countries$.next(c));
    serv.getCountries().subscribe((c: any) => {
      serv.countries = c;
      expect(serv.countries).toEqual(c);
    });

    serv.countries.forEach((cd: any) => countries.push(cd.country));
  });
});
