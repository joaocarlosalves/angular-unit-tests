import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'feed',
  template: `
    <ul>
      <li *ngFor='let post of posts'>
          <a [href]="post.link">
            <span>{{ post.title }}</span><br>
            <span>{{ post.author }}</span><br>
            <span>{{ post.date }}</span>
          </a>
      </li>
    </ul>
  `
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
