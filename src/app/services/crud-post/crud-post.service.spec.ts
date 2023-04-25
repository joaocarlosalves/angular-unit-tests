import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CrudPostService } from './crud-post.service';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

describe('CrudPostService', () => {
  let serv: CrudPostService,
      httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    serv = TestBed.inject(CrudPostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('retrieve posts', () => {
    const mock: Post[] = [
      { userId: 1, id: 1, title: 'title 1', body: 'body 1' },
      { userId: 2, id: 2, title: 'title 2', body: 'body 2' }
    ];

    serv.getAll().subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(mock);
    });

    const req = httpMock.expectOne(`${serv['url']}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('retrieve post by id', () => {
    const mock: Post = { userId: 1, id: 1, title: 'title', body: 'body' };
    serv.getById(1).subscribe(post => expect(post).toEqual(mock));
    const req = httpMock.expectOne(`${serv['url']}/posts/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('create post', () => {
    const mock: Post = { userId: 1, id: 101, title: 'new', body: 'new' };
    serv.create(mock).subscribe(post => expect(post).toEqual(mock));
    const req = httpMock.expectOne(`${serv['url']}/posts`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mock);
    req.flush(mock);
  });

  it('update post', () => {
    const mock: Post = { userId: 1, id: 1, title: 'updated', body: 'updated' };
    serv.update(1, mock).subscribe(post => expect(post).toEqual(mock));
    const req = httpMock.expectOne(`${serv['url']}/posts/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mock);
    req.flush(mock);
  });

  it('delete post', () => {
    serv.delete(1).subscribe(response => expect(response).toEqual({}));
    const req = httpMock.expectOne(`${serv['url']}/posts/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
