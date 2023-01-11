import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { PostService } from 'src/app/services/post/post.service';
import { POSTS } from 'src/app/mocks/posts.mock'
import { FeedComponent } from './feed.component';

describe('FeedComponent', () => {
  let component: FeedComponent,
      serv: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] }).compileComponents();
    serv = TestBed.get(PostService);
    component = new FeedComponent(serv)
  });

  it('should test getPosts()', () => {
    spyOn(serv, 'getPosts').and.returnValue(of(POSTS));
    component.ngOnInit();
    expect(component.posts).toEqual(POSTS);
    component.ngOnDestroy();
  });
});
