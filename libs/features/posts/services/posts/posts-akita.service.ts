import { Injectable, Inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, zip } from 'rxjs';
import { pluck, map } from 'rxjs/operators';
import { PostsService } from './posts.service';
import { PostsApiService } from '../postsApi.service';
import { Post, PostComment } from '../../models';
import { GetPostsGQL, GetPostsGQLResponse } from '../../graphql';

@Injectable({
  providedIn: 'root'
})
export class PostsAkitaService extends PostsService {
  constructor(private postsApi: PostsApiService) {
    super();
  }

  loadPosts(): Observable<Post[]> {
    return this.postsApi
      .getPosts()
      .pipe(
        pluck('data')
      );
  }

  loadPostWithComments(postId: number): Observable<{post: Post, comments: PostComment[]}> {
    const post$ = this.postsApi.getPost(postId);
    const comments$ = this.postsApi.getPostComments(postId);
    
    return zip(post$, comments$).pipe(
      map(([post, comments]: [Post, PostComment[]]) => ({ post, comments }))
    );
  }
}
