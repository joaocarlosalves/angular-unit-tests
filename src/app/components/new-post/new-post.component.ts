import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {
  title: string = '';
  author: string = '';
  link: string = '';
  valid: boolean = false;
  post: any = {}

  constructor(private postService: PostService) { }

  validPost(){
    if(
      this.title !== '' &&
      this.author !== '' &&
      this.link !== ''
    ) this.valid = true;
    else this.valid = false;
  }

  submitPost() {
    this.post = {
      title: this.title,
      author: this.author,
      link: this.link,
      date: new Date().toLocaleDateString("en-US")
    }

    this.postService.insertPost(this.post)
  }
}
