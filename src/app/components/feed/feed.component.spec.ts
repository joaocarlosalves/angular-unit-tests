import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { of, Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { FeedComponent } from './feed.component';

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
  let subscription: Subscription;
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;
  let postService: PostService;
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

  it('should test ngOnInit called', () => {
    let ngOnInit = spyOn(component, 'ngOnInit');

    ngOnInit();
    expect(ngOnInit).toHaveBeenCalled();
  });

  it('should test init called inside ngOnInit', () => {
    let init = spyOn(component, 'init');

    component.ngOnInit();

    init();

    expect(init).toHaveBeenCalled();
  });

  it('should test subscription inside ngOnDestroy called', fakeAsync(() => {
    component.subscription = of().subscribe();

    let unsubSpy = spyOn(component.subscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(unsubSpy).toHaveBeenCalled();
  }));

  it('should test ngOnDestroy called', () => {
    let ngOnDestroy = spyOn(component, 'ngOnDestroy');

    ngOnDestroy();

    expect(ngOnDestroy).toHaveBeenCalled();
  });

  it('should test init called', () => {
    let spyNgOnInit = spyOn(component, 'ngOnInit');
    let spyInit = spyOn(component, 'init');

    spyNgOnInit();

    spyInit();

    expect(spyNgOnInit).toHaveBeenCalledBefore(spyInit);
    expect(spyInit).toHaveBeenCalled();
  });

  it('should test getPosts() subscribe', fakeAsync(() => {
    const postSpy = spyOn(postService, 'getPosts').and.returnValue(of(postList))
    const subSpy = spyOn(postService.getPosts(), 'subscribe')

    component.ngOnInit();

    tick();

    expect(postSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('should test getPosts()', fakeAsync(() => {
    const postSpy = spyOn(postService, 'getPosts').and.returnValue(of(postList));

    component.ngOnInit();

    postService.getPosts().subscribe(posts => {
      component.posts = posts;

      fixture.detectChanges();

      expect(component.posts).toEqual(postList);
    });

    expect(postSpy).toHaveBeenCalled();
  }));
});
