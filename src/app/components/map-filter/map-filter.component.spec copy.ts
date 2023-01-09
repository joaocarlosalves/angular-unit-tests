import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { CountriesService } from 'src/app/services/countries.service';
import { MapFilterComponent } from './map-filter.component';
import { COUNTRIES } from 'src/app/mocks/countries.mock'

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
  });

  afterEach(() => component.ngOnDestroy())

  it('should mount component', () => expect(component).toBeTruthy());

  it('should test ngOnInit',  () => {
    let spyNgOnInit = spyOn(component, 'ngOnInit');
    spyNgOnInit();
    expect(spyNgOnInit).toHaveBeenCalled();
  });

  it('should test getCountries service on ngOnInit',  () => {
    component.ngOnInit();

    of(COUNTRIES).subscribe((c: any) => component.countries = c);

    expect(component.countries).toEqual(COUNTRIES);

  });

  it('should test getCountry()',  fakeAsync(async () => {
    let countries: any[] = [],
        spyGetCountry = spyOn(component, 'getCountry');

    component.ngOnInit();

    tick(100);
    of(spyGetCountry('braz')).subscribe((c: any) => c);

    expect(spyGetCountry).toHaveBeenCalled();

    await COUNTRIES.forEach((cd: any) => {
      if(cd.country.toLowerCase().includes('braz'.toLowerCase())) countries.push(cd);
    });

    component.selectedCountry = await [...new Set(countries)];

    expect(spyGetCountry).toHaveBeenCalledWith('braz');
    expect(component.getCountry).toHaveBeenCalledWith('braz');
    expect(component.selectedCountry).toEqual([{ "country": "Brazil", "id": "BR" }])
  }));


});


