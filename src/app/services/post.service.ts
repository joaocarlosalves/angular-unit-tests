import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public _posts$ = new Subject<void>()
  url: string = 'http://localhost:3000/posts'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }

  retrievePosts() {
    this.httpClient
      .get(`${this.url}`)
      .subscribe((posts: any) => this._posts$.next(posts))
  }

  getPosts() {
    return this._posts$.asObservable()
  }

  insertPost(post: any) {
    let body: any = {
      title: post.title,
      author: post.author,
      link: post.link,
      date: post.date
    }

    this.httpClient.post(this.url, body, this.httpOptions)
      .subscribe(() => this.retrievePosts())
  }
}
