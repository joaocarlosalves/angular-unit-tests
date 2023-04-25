import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class CrudPostService {
  private url = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Post[]> { return this.http.get<Post[]>(`${this.url}/posts`) }

  getById(id: number): Observable<Post> { return this.http.get<Post>(`${this.url}/posts/${id}`) }

  create(post: Post): Observable<Post> { return this.http.post<Post>(`${this.url}/posts`, post) }

  update(id: number, post: Post): Observable<Post> { return this.http.put<Post>(`${this.url}/posts/${id}`, post) }

  delete(id: number): Observable<{}> { return this.http.delete(`${this.url}/posts/${id}`) }
}
