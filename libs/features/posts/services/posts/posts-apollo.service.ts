import { Injectable, Inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { pluck, map } from 'rxjs/operators';
import { PostsService } from './posts.service';
import { Post, PostComment } from '../../models';
import { GetPostsGQL, GetPostGQL, GetPostsGQLResponse, PostWithComments } from '../../graphql';

@Injectable({
  providedIn: 'root'
})
export class PostsApolloService extends PostsService {
  constructor(
    private apollo: Apollo,
    private getPostsGQL: GetPostsGQL,
    private getPostGQL: GetPostGQL,
  ) {
    super();
  }

  loadPosts(): Observable<Post[]> {
    return this.getPostsGQL
      .watch()
      .valueChanges
      .pipe(
        pluck('data', 'getPosts')
      );
  }

  loadPostWithComments(postId: number): Observable<{post: Post, comments: PostComment[]}> {
    return this.getPostGQL
      .watch({ postId })
      .valueChanges.pipe(
        pluck('data', 'getPost'),
        map((postWithComments: PostWithComments) => {
          const { comments, ...post } = postWithComments;
          return { post, comments };
        })
      );
  }
};
