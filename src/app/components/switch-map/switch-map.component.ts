import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'user-list',
  template: ``,
})
export class UserListComponent {
  users$: Observable<User[]>;

  constructor(private http: HttpClient) {
    this.users$ = this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').pipe(
      switchMap(() => {
        return this.http.get<any>('https://jsonplaceholder.typicode.com/posts');
      }),
    );
  }
}
