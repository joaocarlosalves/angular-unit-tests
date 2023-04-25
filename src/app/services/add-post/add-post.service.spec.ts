import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostService } from './add-post.service';

describe('PostService', () => {
  let serv: PostService,
      httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    serv = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should add a post', () => {
    const newPost = { title: 'Test Post', body: 'This is a test post' };
    serv.addPost(newPost).subscribe();
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
    expect(req.request.method).toBe('POST');
    req.flush(newPost);
    httpMock.verify();
  });
});
