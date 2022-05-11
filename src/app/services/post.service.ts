import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private _posts$ = new Subject<void>()
  lastId: number;
  url = 'http://localhost:3000/posts'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }

  retrievePosts() {
    this.httpClient
      .get(`${this.url}`)
      .subscribe((posts: any) => {
        if (posts.length !== undefined) {
          this._posts$.next(posts)
          this.lastId = posts.length + 1
        }
        else this._posts$.next()
      })
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
