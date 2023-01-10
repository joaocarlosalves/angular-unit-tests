import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from 'src/app/services/store/store.service';
import { NewPostComponent } from './new-post/new-post.component';
import { FeedComponent } from './feed/feed.component';
import { PostsComponent } from './posts/posts.component';
import { MapFilterComponent } from './map-filter/map-filter.component';
import { PushPopComponent } from './push-pop/push-pop.component';
import { SearchCountryComponent } from './search-country/search-country.component';
import { ExampleModule } from './example/example.module';

@NgModule({
  declarations: [
    NewPostComponent,
    FeedComponent,
    PostsComponent,
    MapFilterComponent,
    PushPopComponent,
    SearchCountryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ExampleModule
  ],
  exports: [
    NewPostComponent,
    FeedComponent,
    PostsComponent,
    MapFilterComponent,
    PushPopComponent,
    SearchCountryComponent
  ],
  providers: [Store]
})
export class ComponentsModule { }