import { Injectable, Inject } from '@angular/core';
import { parseValidationErrors } from '@sonder/utils';
import { Observable, zip, throwError, of } from 'rxjs';
import { pluck, map, tap, catchError, switchMap } from 'rxjs/operators';
import { PostsApiService } from '../services';
import { Post, PostWithFullTags, PostComment, Tag } from '../models';
import { PostsStore } from './posts.store';
import { CommentsStore } from './comments.store';
import { TagsService } from './tags.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(
    private postsApi: PostsApiService,
    private postsStore: PostsStore,
    private commentsStore: CommentsStore,
    private tagsService: TagsService
  ) {
  }

      pluck('data'),
      tap((posts: PostWithFullTags[]) => this.tagsService.addTags(posts.reduce((acc, post) => [...acc, ...post.tags], []))),
      map((posts: PostWithFullTags[]) => posts.reduce((acc, post) =>
      tap((posts: Post[]) => this.postsStore.set(posts))
    );
  }

  loadPostWithComments(
    postId: number
  ): Observable<{ post: Post; comments: PostComment[] }> {
    const post$ = this.postsApi
      .getPost(postId)
      .pipe(
        tap((post: PostWithFullTags) => this.tagsService.addTags(post.tags)),
        map((post: PostWithFullTags) => ({
          ...post,
          tags: post.tags.map(({ id }) => id)
        }))
      );
    const comments$ = this.postsApi.getPostComments(postId);

    return zip(post$, comments$).pipe(
      map(([post, comments]: [Post, PostComment[]]) => ({ post, comments })),
      tap(({ post, comments }: { post: Post; comments: PostComment[] }) => {
        this.postsStore.upsert(post.id, post);
        this.commentsStore.addPostComments(post.id, comments);
      })
    );
  }

  createPost(post: Post, tags: Tag[]): Observable<Post> {
    return this.postsApi.createPost(post, tags).pipe(
      tap((createdPost: PostWithFullTags) => this.tagsService.addTags(createdPost.tags)),
      map((createdPost: PostWithFullTags) => ({...createdPost, tags: createdPost.tags.map(({id}) => id)})),
      tap((createdPost: Post) => this.postsStore.upsert(createdPost.id, createdPost)),
      catchError(error => {
        const message = _.get(error, 'error.message');
        throw message ? parseValidationErrors(message) : error;
      })
    );
  }

  createComment(postId: number, comment: PostComment): Observable<PostComment> {
    return this.postsApi.createComment(postId, comment).pipe(
      tap((createdComment: PostComment) =>
        this.commentsStore.upsert(createdComment.id, {
          ...createdComment,
          childrenIds: []
        })
      ),
      catchError(error => {
        const message = _.get(error, 'error.message');
        throw message ? parseValidationErrors(message) : error;
      })
    );
  }
}
