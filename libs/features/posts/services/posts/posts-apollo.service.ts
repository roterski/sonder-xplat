import { Injectable, Inject } from '@angular/core';
import { parseValidationErrors } from '@sonder/utils';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { pluck, map, tap, catchError } from 'rxjs/operators';
import { PostsService } from './posts.service';
import { Post, PostComment } from '../../models';
import { PostsStore, CommentsStore } from '../../state';
import {
  CreatePostGQL,
  CreateCommentGQL,
  GetPostsGQL,
  GetPostGQL,
  GetPostGQLResponse,
  GetPostsGQLResponse,
  PostWithComments
} from '../../graphql';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PostsApolloService extends PostsService {
  constructor(
    private apollo: Apollo,
    private getPostsGQL: GetPostsGQL,
    private getPostGQL: GetPostGQL,
    private createPostGQL: CreatePostGQL,
    private createCommentGQL: CreateCommentGQL,
    private postsStore: PostsStore,
    private commentsStore: CommentsStore
  ) {
    super();
  }

  loadPosts(): Observable<Post[]> {
    return this.getPostsGQL.watch().valueChanges.pipe(
      pluck('data', 'getPosts'),
      tap((posts: Post[]) => this.postsStore.set(posts))
    );
  }

  loadPostWithComments(
    postId: number
  ): Observable<{ post: Post; comments: PostComment[] }> {
    return this.getPostGQL.watch({ postId }).valueChanges.pipe(
      pluck('data', 'getPost'),
      map((postWithComments: PostWithComments) => {
        const { comments, ...post } = postWithComments;
        return { post, comments };
      }),
      tap(({ post, comments }: { post: Post; comments: PostComment[] }) => {
        this.postsStore.createOrReplace(post.id, post);
        this.commentsStore.addPostComments(post.id, comments);
      })
    );
  }

  createPost(post: Post): Observable<Post> {
    return this.createPostGQL
      .mutate(post, {
        optimisticResponse: {
          __typename: 'Mutation',
          createPost: {
            __typename: 'Post',
            id: Math.round(Math.random() * -1000000),
            ...post
          }
        },
        update: (store, { data: { createPost: createdPost } }) => {
          const query = this.getPostsGQL.document;
          const data: GetPostsGQLResponse = store.readQuery({ query });

          data.getPosts.push(createdPost);
          store.writeQuery({ query, data });
        }
      })
      .pipe(
        tap((post: Post) => this.postsStore.createOrReplace(post.id, post)),
        catchError(error => {
          const message = _.get(error, 'graphQLErrors[0].message.message');
          throw message ? parseValidationErrors(message) : error;
        })
      );
  }

  createComment(postId: number, comment: PostComment): Observable<PostComment> {
    return this.createCommentGQL
      .mutate(comment, {
        optimisticResponse: {
          __typename: 'Mutation',
          createComment: {
            __typename: 'Comment',
            id: Math.round(Math.random() * -1000000),
            ...comment
          }
        },
        update: (store, { data: { createComment: createdComment } }) => {
          const query = this.getPostGQL.document;
          const variables = { postId };
          const data: GetPostGQLResponse = store.readQuery({
            query,
            variables
          });

          data.getPost.comments.push(createdComment);
          store.writeQuery({ query, data });
        }
      })
      .pipe(
        tap((comment: PostComment) =>
          this.commentsStore.createOrReplace(comment.id, comment)
        ),
        catchError(error => {
          const message = _.get(error, 'graphQLErrors[0].message.message');
          throw message ? parseValidationErrors(message) : error;
        })
      );
  }
}
