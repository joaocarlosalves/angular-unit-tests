import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { NewPostComponent } from './new-post.component';

describe('NewPostComponent', () => {
  let component: NewPostComponent,
      fixture: ComponentFixture<NewPostComponent>,
      postService: PostService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [NewPostComponent],
      providers: [PostService],
    }).compileComponents();

    fixture = TestBed.createComponent(NewPostComponent);
    component = fixture.componentInstance;
    postService = TestBed.get(PostService);
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should test validPost() and check if valid === true ', () => {
    component.title = '1';
    component.author = '2';
    component.link = '3';
    component.validPost();
    expect(component.valid).toEqual(true);
  });

  it('should test validPost() and check if valid === false ', () => {
    component.validPost();
    expect(component.valid).toEqual(false);
  });

  it('should submitPost()', () => {
    let post = {
      title: 'this.title',
      author: 'this.author',
      link: 'this.link',
      date: '05/05/2022',
    };
    component.submitPost();
    let postSpy = spyOn(postService, 'insertPost');
    postSpy(post);
    expect(postSpy).toHaveBeenCalledWith(post);
  });
});
