import { SliceSpliceComponent } from './slice-splice.component';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { COUNTRIES } from 'src/app/mocks/countries.mock';

describe('SliceSpliceComponent', () => {
  let component: SliceSpliceComponent,
      serv: CountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    serv = TestBed.get(CountriesService);
    component = new SliceSpliceComponent(serv);
    component.ngOnInit();
  });

  it('searchCountry empty array', fakeAsync(() => {
    component.searchCountry({ target: { value: 'a' } });
    tick(501);
    expect(component.selectedCountry = []).toEqual([]);
  }));

  it('selectedCountry, if the search term is more than two characters and test subscribe',
  fakeAsync(() => {
    of(COUNTRIES).subscribe((c: any) => component.countries = c);
    component.searchCountry({ target: { value: 'braz' } });
    tick(101);
    expect(of(COUNTRIES).subscribe((c: any) => serv._countries$.next(c))).toBeTruthy();
    expect(component.selectedCountry = [{ "country": "Brazil", "id": "BR" }]).toEqual([{ "country": "Brazil", "id": "BR" }]);
  }));
});
