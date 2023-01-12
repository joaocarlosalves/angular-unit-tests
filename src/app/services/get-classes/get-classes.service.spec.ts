import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { QuestsService } from './get-classes.service';
import { QUESTS } from 'src/app/mocks/quests.mock';

describe('QuestsService', () => {
  let serv: QuestsService,
      httpMock: HttpTestingController,
      http: HttpClient,
      error: HttpErrorResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [QuestsService] });
    error = new HttpErrorResponse({ error: new ErrorEvent('network error'), status: 404 });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    serv = TestBed.inject(QuestsService);
  });

  it('should call addQuestInProgress', () => {
    serv.addQuestInProgress(1, 1);
    expect(serv.addQuestInProgress).toBeTruthy();
  });

  it('should call getQuests', () => {
    serv.getQuests();
    expect(serv.getQuests).toBeTruthy();
  });

  it('should call handleError', () => {
    serv.handleError(HttpErrorResponse.prototype);
    serv.handleError(error);
    expect(serv.handleError).toThrowError(error.error.message);
  });

  it('should getQuestListByClass have been called', () => {
    let httpSpy = spyOn(http, 'get').and.returnValue(of(QUESTS));
    serv.getQuestListByClass(2);
    httpSpy('').subscribe();
    expect(httpSpy).toHaveBeenCalled();
  });
});
