import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CountriesService } from 'src/app/services/countries.service';

let countries: any[] = [
  { "country": "Bhutan", "id": "BT" },
  { "country": "Bolivia", "id": "BO" },
  { "country": "Bosnia and Herz.", "id": "BA" },
  { "country": "Botswana", "id": "BW" },
  { "country": "Brazil", "id": "BR" },
  { "country": "Brunei", "id": "BN" },
  { "country": "Bulgaria", "id": "BG" },
  { "country": "Burkina Faso", "id": "BF" },
  { "country": "Burundi", "id": "BI" }
],
service = CountriesService;

describe('CountriesService', () => {
  it('should be created', () => expect(service).toBeTruthy());
});
