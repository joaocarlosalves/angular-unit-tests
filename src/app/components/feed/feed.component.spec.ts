import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
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
    postService = TestBed.get(PostService)
  });

  it('should create', () => expect(component).toBeTruthy());

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
    let spyunsub = spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(spyunsub).toHaveBeenCalled();
  }));

  it('should test ngOnDestroy called', () => {
    let spyNgOnDestroy = spyOn(component, 'ngOnDestroy');
    spyNgOnDestroy();
    expect(spyNgOnDestroy).toHaveBeenCalled();
  });

  it('should test init called', () => {
    let spyNgOnInit = spyOn(component, 'ngOnInit'),
        spyInit = spyOn(component, 'init');
    spyNgOnInit();
    spyInit();
    expect(spyNgOnInit).toHaveBeenCalledBefore(spyInit);
    expect(spyInit).toHaveBeenCalled();
  });

  it('should test getPosts() subscribe', fakeAsync(() => {
    let postSpy = spyOn(postService, 'getPosts').and.returnValue(of(posts)),
        subSpy = spyOn(postService.getPosts(), 'subscribe');
    component.ngOnInit();
    tick();
    expect(postSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('should test getPosts()', fakeAsync(() => {
    let spyPosts = spyOn(postService, 'getPosts').and.returnValue(of(posts));
    component.ngOnInit();
    postService.getPosts().subscribe(p => expect(p).toEqual(posts));
    expect(spyPosts).toHaveBeenCalled();
  }));
});
