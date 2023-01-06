import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  posts$ = new Subject<void>();
  opt = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) {}

  retrievePosts() { this.http.get('http://localhost:3000/posts').subscribe((p: any) => this.posts$.next(p)) }

  getPosts() { return this.posts$.asObservable() }

  insertPost(post: any) {
    let body = {
      title: post.title,
      author: post.author,
      link: post.link,
      date: post.date
    };

    this.http.post('http://localhost:3000/posts', body, this.opt).subscribe(() => this.retrievePosts());
  }
}
