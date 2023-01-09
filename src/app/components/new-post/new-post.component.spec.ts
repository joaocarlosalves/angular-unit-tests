import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { NewPostComponent } from './new-post.component';

describe('NewPostComponent', () => {
  let component: NewPostComponent,
      serv: PostService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [NewPostComponent],
      providers: [PostService],
    });

    serv = TestBed.get(PostService);
    component = new NewPostComponent(serv);
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should test validPost() and check if valid = true ', () => {
    component.title = '1';
    component.author = '2';
    component.link = '3';
    component.validPost();
    expect(component.valid).toEqual(true);
  });

  it('should test validPost() and check if valid = false ', () => {
    component.validPost();
    expect(component.valid).toEqual(false);
  });

  it('should submitPost()', () => {
    let post = {
      title: 'this.title',
      author: 'this.author',
      link: 'this.link',
      date: '05/05/2022',
    },
    postSpy = spyOn(serv, 'insertPost');

    component.submitPost();
    postSpy(post);
    expect(postSpy).toHaveBeenCalledWith(post);
  });
});
