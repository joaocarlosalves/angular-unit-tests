import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be retrievePosts()', () => {
    expect(service).toBeTruthy();
  });

  it('should be insertPost()', () => {
    expect(service).toBeTruthy();
  });

  it('should be getPosts()', () => {
    expect(service).toBeTruthy();
  });
});
