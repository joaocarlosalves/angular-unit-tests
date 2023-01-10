import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { PostService } from './post.service';
import { of } from 'rxjs';
import { POSTS } from 'src/app/mocks/posts.mock';

const body: any = {
  title: 'post.title',
  author: 'post.author',
  link: 'post.link',
  date: 'post.date'
};

describe('PostService', () => {
  let postService: PostService,
      httpMock: HttpTestingController,
      http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    postService = TestBed.inject(PostService);
  });

  it('should postService be created', () => expect(postService).toBeTruthy());

  it('should test insertPost(body)', async () => {
    postService.insertPost(body);
    let req = await httpMock.expectOne('http://localhost:3000/posts');
    expect(req.request.method).toEqual('POST');
    req.flush(body);
  });

  it('description', fakeAsync(() => {
    let postSpy = spyOn(http, 'get').and.returnValue(of(POSTS)),
        next = spyOn(postService.posts$, 'next');
    postService.retrievePosts();
    postSpy(POSTS).subscribe(() => {
      next(POSTS);
      expect(next).toHaveBeenCalledWith(POSTS);
    });
    flush();
  }));
});
