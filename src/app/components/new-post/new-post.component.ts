import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'new-post',
  template:  `
    <div>
      <form>
          <div class='input-line'>
            <label>TITLE</label>
            <input [(ngModel)]="title" name="title" (keyup)='validPost()' />
          </div>

          <div class='input-line'>
            <label>AUTHOR</label>
            <input [(ngModel)]="author" name="author" (keyup)='validPost()' />
          </div>

          <div class='input-line'>
            <label>LINK</label>
            <input [(ngModel)]="link" name="link" (keyup)='validPost()' />
          </div>

          <button class="default" [disabled]="!valid ? 'disabled' : ''" (click)='submitPost()'>POST</button>
      </form>
    </div>
  `
})

export class NewPostComponent {
  title: string = '';
  author: string = '';
  link: string = '';
  valid: boolean = false;
  post: any = {};

  constructor(private postService: PostService) {}

  validPost(){
    if(this.title !== '' && this.author !== '' && this.link !== '') this.valid = true
  }

  submitPost() {
    this.post = {
      title: this.title,
      author: this.author,
      link: this.link,
      date: new Date().toLocaleDateString("en-US")
    }

    this.postService.insertPost(this.post);
  }
}
