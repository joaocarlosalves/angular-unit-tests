import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { PostService } from './post.service';
import { POSTS } from 'src/app/mocks/posts.mock';

describe('PostService', () => {
  let serv: PostService,
      httpMock: HttpTestingController,
      http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    serv = TestBed.inject(PostService);
  });

  it('should test insert Post', async () => {
    serv.insertPost('');
    let req = await httpMock.expectOne('http://localhost:3000/posts');
    expect(req.request.method).toEqual('POST');
    req.flush('');
  });

  it('should test getPost', () => {
    let postSpy = spyOn(http, 'get').and.returnValue(of(POSTS));
    serv.retrievePosts();
    postSpy('').subscribe();
    expect(postSpy).toHaveBeenCalled();
    serv.getPosts();
    expect(serv.getPosts).toBeTruthy();
  });
});
