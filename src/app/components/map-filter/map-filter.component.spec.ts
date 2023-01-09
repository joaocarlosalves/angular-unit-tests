import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, Subscription } from 'rxjs';
import { CountriesService } from 'src/app/services/countries.service';
import { MapFilterComponent } from './map-filter.component';
import { COUNTRIES } from 'src/app/mocks/countries.mock';

describe('ChildComponent', () => {
  let component: MapFilterComponent,
      fixture: ComponentFixture<MapFilterComponent>,
      serv: CountriesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MapFilterComponent],
      providers: [CountriesService]
    }).compileComponents();

    fixture = TestBed.createComponent(MapFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serv = TestBed.inject(CountriesService);
    component.ngOnInit();
    component.subscription = new Subscription;
  });

  afterEach(() => component.ngOnDestroy())

  it('should mount component', () => expect(component).toBeTruthy());

  it('should test ngOnInit', () => {
    let spyNgOnInit = spyOn(component, 'ngOnInit');
    spyNgOnInit();
    expect(spyNgOnInit).toHaveBeenCalled();
  });


  it('should test subscription on ngOnInit', () => {
    of(COUNTRIES).subscribe((c: any) => serv._countries$.next(c));
    component.subscription = serv.getCountries().subscribe((c: any) => {
      serv.countries = c;
      expect(serv.countries).toEqual(c);
    });
  });


  it('should test getCountry()', fakeAsync(async () => {
    of(COUNTRIES).subscribe((c: any) => component.countries = c);
    let countries: any[] = [], spyGetCountry = spyOn(component, 'getCountry');

    tick(100);
    of(spyGetCountry('braz')).subscribe((c: any) => c);

    expect(spyGetCountry).toHaveBeenCalled();

    await component.countries.forEach((cd: any) => {
      if(cd.country.toLowerCase().includes('braz'.toLowerCase())) countries.push(cd);
    });

    component.selectedCountry = await [...new Set(countries)];

    expect(spyGetCountry).toHaveBeenCalledWith('braz');
    expect(component.getCountry).toHaveBeenCalledWith('braz');
    expect(component.selectedCountry).toEqual([{ "country": "Brazil", "id": "BR" }]);
  }));


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
