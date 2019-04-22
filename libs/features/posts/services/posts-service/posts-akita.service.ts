import { Injectable, Inject } from '@angular/core';
import { parseValidationErrors } from '@sonder/utils';
import { Observable, zip, throwError } from 'rxjs';
import { pluck, map, tap, catchError, delay } from 'rxjs/operators';
import { PostsService } from './posts.service';
import { PostsApiService } from '../posts-api.service';
import { Post, PostWithFullTags, PostComment, Tag } from '../../models';
import { PostsStore, CommentsStore, TagsStore } from '../../state';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PostsAkitaService extends PostsService {
  constructor(
    private postsApi: PostsApiService,
    private postsStore: PostsStore,
    private commentsStore: CommentsStore,
    private tagsStore: TagsStore
  ) {
    super();
  }

  loadPosts(): Observable<Post[]> {
    return this.postsApi.getPosts().pipe(
      pluck('data'),
      tap((posts: PostWithFullTags[]) => this.tagsStore.add(posts.reduce((acc, post) => [...acc, ...post.tags], []))),
      map((posts: PostWithFullTags[]) => posts.reduce((acc, post) =>
        [...acc, {...post, tags: post.tags.map(({id}: Tag) => id)}], [])),
      tap((posts: Post[]) => this.postsStore.set(posts))
    );
  }

  loadPostWithComments(
    postId: number
  ): Observable<{ post: Post; comments: PostComment[] }> {
    const post$ = this.postsApi
      .getPost(postId)
      .pipe(
        tap((post: PostWithFullTags) => this.tagsStore.add(post.tags)),
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
      tap((createdPost: PostWithFullTags) => this.tagsStore.add(createdPost.tags)),
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
