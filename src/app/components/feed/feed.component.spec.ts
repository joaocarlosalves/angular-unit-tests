import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { FeedComponent } from './feed.component';
import { POSTS } from 'src/app/mocks/posts.mock'

describe('FeedComponent', () => {
  let component: FeedComponent,
      fixture: ComponentFixture<FeedComponent>,
      postService: PostService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FeedComponent],
      providers: [PostService]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    postService = TestBed.get(PostService);
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should test ngOnInit', () => {
    let init = spyOn(component, 'ngOnInit');
    init();
    expect(init).toHaveBeenCalled();
  });

  it('should test getPosts()', fakeAsync(() => {
    let spyPosts = spyOn(postService, 'getPosts').and.returnValue(of(POSTS));
    component.ngOnInit();
    postService.getPosts().subscribe(p => expect(p).toEqual(POSTS));
    expect(component.posts).toEqual(POSTS);
    expect(spyPosts).toHaveBeenCalled();
  }));
});
