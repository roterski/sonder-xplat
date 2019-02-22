import { Injectable, Inject } from '@angular/core';
import { Observable, zip, throwError } from 'rxjs';
import { pluck, map, tap, catchError } from 'rxjs/operators';
import { PostsService } from './posts.service';
import { PostsApiService } from '../postsApi.service';
import { Post, PostComment } from '../../models';
import { PostsStore, CommentsStore } from '../../state';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PostsAkitaService extends PostsService {
  constructor(
    private postsApi: PostsApiService,
    private postsStore: PostsStore,
    private commentsStore: CommentsStore
  ) {
    super();
  }

  loadPosts(): Observable<Post[]> {
    return this.postsApi.getPosts().pipe(
      pluck('data'),
      tap((posts: Post[]) => this.postsStore.set(posts))
    );
  }

  loadPostWithComments(
    postId: number
  ): Observable<{ post: Post; comments: PostComment[] }> {
    const post$ = this.postsApi.getPost(postId);
    const comments$ = this.postsApi.getPostComments(postId);

    return zip(post$, comments$).pipe(
      map(([post, comments]: [Post, PostComment[]]) => ({ post, comments })),
      tap(({ post, comments }: { post: Post; comments: PostComment[] }) => {
        this.postsStore.createOrReplace(post.id, post);
        this.commentsStore.addPostComments(post.id, comments);
      })
    );
  }

  createPost(post: Post): Observable<Post> {
    return this.postsApi
      .createPost(post)
      .pipe(
        tap((post: Post) => this.postsStore.createOrReplace(post.id, post)),
        catchError((error) => {
          const message = _.get(error, 'error.message');
          throw(message ? this.parseValidationErrors(message) : error);
        })
      );
  }
}
