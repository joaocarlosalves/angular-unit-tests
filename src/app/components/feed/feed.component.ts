import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  subscription: Subscription;
  posts: any;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.init()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async init() {
    await this.postService.retrievePosts()
    await this.getPosts()
  }

  getPosts() {
    this.postService.getPosts()
    .subscribe((posts: any) => {
      this.posts = posts
      //console.log(this.posts)
    })
  }

}
