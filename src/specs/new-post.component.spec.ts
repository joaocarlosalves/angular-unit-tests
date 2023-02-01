import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostService } from 'src/services/post.service';
import { NewPostComponent } from '../components/new-post.component';

describe('NewPostComponent', () => {
  let component: NewPostComponent,
      serv: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    serv = TestBed.get(PostService);
    component = new NewPostComponent(serv);
  });

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
    let postSpy = spyOn(serv, 'insertPost');
    component.submitPost();
    postSpy('post');
    expect(postSpy).toHaveBeenCalledWith('post');
  });
});
