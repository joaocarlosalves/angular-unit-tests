import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { MapFilterComponent } from './map-filter.component';
import { COUNTRIES } from 'src/app/mocks/countries.mock';

describe('ChildComponent', () => {
  let component: MapFilterComponent,
      serv: CountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    serv = TestBed.inject(CountriesService);
    component = new MapFilterComponent(serv);
    component.ngOnInit();
  });

  afterEach(() => component.ngOnDestroy());

  it('should test subscription on ngOnInit', () => expect(of(COUNTRIES).subscribe((c: any) => serv._countries$.next(c))).toBeTruthy());

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
