import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { FeedComponent } from './feed.component';
import { Subscription, of } from 'rxjs';
import { PostService } from 'src/app/services/post.service';

const posts: any = [
  {
    "title": "The sun’s searing radiation led to the shuffling of the solar system’s planets",
    "link": "https://www.sciencenews.org/article/sun-radiation-solar-system-planet-orbit-astronomy",
    "author": "Science News",
    "date": "05/10/2022",
    "id": 1
  },
  {
    "title": "Should Earthlings blast out our location to the cosmos?",
    "link": "https://astronomy.com/news/2022/05/should-earthlings-blast-out-our-location-to-the-cosmos",
    "author": "Astronomy",
    "date": "05/10/2022",
    "id": 2
  },
  {
    "title": "Valneva COVID-19 vaccine: What do we know about it?",
    "link": "https://www.medicalnewstoday.com/articles/valneva-covid-19-vaccine-what-do-we-know-about-it",
    "author": "Medical News Today",
    "date": "05/10/2022",
    "id": 3
  },
  {
    "title": "Clearpath Announces TurtleBot 4",
    "author": "IEEE Spectrum",
    "link": "https://spectrum.ieee.org/turtlebot-4",
    "date": "5/10/2022",
    "id": 4
  }
];

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;
  let postService: PostService;
  let sub: Subscription;
  let postList = posts;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      declarations: [FeedComponent],
      providers: [PostService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    postService = TestBed.get(PostService)
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should test subscribe', fakeAsync(() => {
    const postSpy = spyOn(postService, 'getPosts').and.returnValue(of(postList))
    const subSpy = spyOn(postService.getPosts(), 'subscribe')

    component.ngOnInit();

    tick();

    expect(postSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));


  it('should test getPosts()', fakeAsync(() => {
    const postSpy = spyOn(postService, 'getPosts').and.returnValue(of(postList))
    component.ngOnInit();

    tick();

    expect(postSpy).toHaveBeenCalled();

    tick();

    postService.getPosts().subscribe(posts => {
      component.posts = posts;

      fixture.detectChanges();
      expect(component.posts).toEqual(postList);
    });
  }));

});
