import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';

import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  PostsBaseComponent,
  Post,
  GetPostsGQL,
  GetPostsGQLResponse
} from '@sonder/features';

import { RouterExtensions } from 'nativescript-angular/router';
import { AuthService } from '@sonder/features/auth';
@Component({
  moduleId: module.id,
  selector: 'sonder-posts-list-page',
  templateUrl: './posts-list-page.component.html'
})
export class PostsListPageComponent extends PostsBaseComponent implements OnInit {
  posts: Post[];
  loading = true;
  posts$: Observable<Post[]>;

  constructor(private getPostsGQL: GetPostsGQL, private authService: AuthService, private routerExtensions: RouterExtensions) {
    super();
  }

  ngOnInit() {
    debugger
    console.log('ON INIT');
  }

  loadPosts() {
    // debugger
    // this.posts = [
    //   {
    //     id: 5,
    //     title: 'test',
    //     body: 'body'
    //   }
    // ]
    this.getPostsGQL
      .watch()
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((result: ApolloQueryResult<GetPostsGQLResponse>) => {
        debugger
        console.log('FETCHED POSTS');
        this.posts = result.data.getPosts;
        this.loading = result.loading;
      });
  }

  logOut() {
    this.authService.logOut().subscribe(() => this.routerExtensions.navigate(['/login'], { clearHistory: true }));
  }
}
