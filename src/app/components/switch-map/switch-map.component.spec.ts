import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserListComponent } from './switch-map.component';

describe('UserListComponent', () => {
  let component: UserListComponent,
      fixture: ComponentFixture<UserListComponent>,
      httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should get users and posts', () => {
    const mockUsers: any = [
      { id: 1, name: 'Claudia Watson', email: 'claudia@email.cc' },
      { id: 2, name: 'Sheyla Smith', email: 'sheyla@email.cc' }
    ],
    mockPosts: any = [
      { userId: 1, id: 1, title: 'Lorem ipsum', body: 'Dolor sit amet.' },
      { userId: 2, id: 2, title: 'Dolor sit amet', body: 'Consectetur adipiscing elit.' }
    ];

    component.users$.subscribe(users => expect(users).toEqual(mockPosts));
    httpMock.expectOne('https://jsonplaceholder.typicode.com/users').flush(mockUsers);
    httpMock.expectOne('https://jsonplaceholder.typicode.com/posts').flush(mockPosts);
    httpMock.verify();
  });
});
