import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'feed',
  template: ``
})
export class FeedComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  posts: any;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.retrievePosts();
    this.subscription = this.postService.getPosts().subscribe((p: any) => this.posts = p);
  }

  ngOnDestroy() { this.subscription.unsubscribe() }
}
