import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { NewPostComponent } from './new-post.component';

describe('NewPostComponent', () => {
  let component: NewPostComponent;
  let fixture: ComponentFixture<NewPostComponent>;
  let postService: PostService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, FormsModule],
      declarations: [NewPostComponent],
      providers: [PostService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    postService = TestBed.get(PostService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test validPost() and check if valid === false ', () => {
    component.title = ''
    component.author = ''
    component.link = ''

    component.validPost();

    expect(component.valid).toEqual(false);
  });

  it('should test validPost() and check if valid === true ', () => {
    component.title = '1'
    component.author = '2'
    component.link = '3'

    component.validPost();

    expect(component.valid).toEqual(true);
  });

  it('should submitPost()', () => {
    let post = {
      title: 'this.title',
      author: 'this.author',
      link: 'this.link',
      date: '05/05/2022'
    }

    component.submitPost();

    const postSpy = spyOn(postService, 'insertPost');

    postSpy(post);

    expect(postSpy).toHaveBeenCalledWith(post);
  });
});
