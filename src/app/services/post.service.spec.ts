import { Injectable } from '@angular/core';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { PostService } from './post.service';
import { of } from 'rxjs';

let body: any = {
  title: 'post.title',
  author: 'post.author',
  link: 'post.link',
  date: 'post.date',
};

const posts: any = [
  {
    title:
      'The sun’s searing radiation led to the shuffling of the solar system’s planets',
    link: 'https://www.sciencenews.org/article/sun-radiation-solar-system-planet-orbit-astronomy',
    author: 'Science News',
    date: '05/10/2022',
    id: 1,
  },
  {
    title: 'Should Earthlings blast out our location to the cosmos?',
    link: 'https://astronomy.com/news/2022/05/should-earthlings-blast-out-our-location-to-the-cosmos',
    author: 'Astronomy',
    date: '05/10/2022',
    id: 2,
  },
  {
    title: 'Valneva COVID-19 vaccine: What do we know about it?',
    link: 'https://www.medicalnewstoday.com/articles/valneva-covid-19-vaccine-what-do-we-know-about-it',
    author: 'Medical News Today',
    date: '05/10/2022',
    id: 3,
  },
  {
    title: 'Clearpath Announces TurtleBot 4',
    author: 'IEEE Spectrum',
    link: 'https://spectrum.ieee.org/turtlebot-4',
    date: '5/10/2022',
    id: 4,
  },
];

let httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

describe('PostService', () => {
  let postService: PostService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [Injectable, PostService],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    postService = TestBed.inject(PostService);
  });

  it('should postService be created', () => {
    expect(postService).toBeTruthy();
  });

  it('should test insertPost(body)', async () => {
    postService.insertPost(body);

    const req = await httpMock.expectOne('http://localhost:3000/posts');

    expect(req.request.method).toEqual('POST');

    req.flush(body);
  });

  it('description', fakeAsync(() => {
    let postSpy = spyOn(httpClient, 'get').and.returnValue(of(posts));
    let next = spyOn(postService._posts$, 'next');

    postService.retrievePosts();

    postSpy(posts).subscribe(() => {
      next(posts);
      expect(next).toHaveBeenCalledWith(posts);
    });

    flush();
  }));
});
