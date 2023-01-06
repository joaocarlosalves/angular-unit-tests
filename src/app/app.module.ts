import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { FeedComponent } from './components/feed/feed.component';
import { PostsComponent } from './pages/posts/posts.component';
import { Store } from './services/store/store.service';
import { ExampleModule } from './components/example/example.module';

@NgModule({
  declarations: [
    AppComponent,
    NewPostComponent,
    FeedComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ExampleModule
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule { }
