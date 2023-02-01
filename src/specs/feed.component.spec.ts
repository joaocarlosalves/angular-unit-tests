import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { POSTS } from 'src/mocks/posts.mock';
import { PostService } from 'src/services/post.service';
import { FeedComponent } from '../components/feed.component';

describe('FeedComponent', () => {
  let component: FeedComponent,
      serv: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] }).compileComponents();
    serv = TestBed.get(PostService);
    component = new FeedComponent(serv);
  });

  afterEach(() => component.ngOnDestroy());

  it('should test getPosts()', () => {
    spyOn(serv, 'getPosts').and.returnValue(of(POSTS));
    component.ngOnInit();
    expect(component.posts).toEqual(POSTS);
  });
});
