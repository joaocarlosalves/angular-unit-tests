import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuestsService {
  _quests$ = new Subject<void>();

  url = 'http://code-rpg.com/api/quest';

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private httpClient: HttpClient) {}

  getQuestListByClass(id: number) {
    this.httpClient
      .get(`${ this.url }/main-class/${ id }`)
      .pipe(catchError(this.handleError))
      .subscribe((quests: any) => this._quests$.next(quests))
  }

  addQuestInProgress(id: any, user: any): Observable<any> {
    return this.httpClient
      .post(`${ this.url }/in-progress/${ id }/${ user }`, '')
      .pipe(catchError(this.handleError))
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getQuests() { return this._quests$.asObservable() }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) errorMessage = error.error.message;
    else errorMessage = `Error Code: ${ error.status }, ` + `Error: ${ error.message }`;
    return throwError(errorMessage);
  }
}
