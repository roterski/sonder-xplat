import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Post, PostComment, Tag } from '../models';
import { BackendService } from '@sonder/features/auth/services/backend.service';

@Injectable({
  providedIn: 'root'
})
export class PostsApiService {
  constructor(private backend: BackendService) {}

  getPosts(params: any = {}): Observable<any> {
    return this.backend.get('/posts', ...params);
  }

  getPost(postId: number | string): Observable<Post> {
    return this.backend
      .get(`/posts/${postId}`)
      .pipe(map(response => response.data));
  }

  createPostWithTags(post: Post, tags: Tag[]): Observable<Post> {
    return this.backend
      .post('/posts', { post, tags })
      .pipe(map(response => response.data));
  }

  getPostComments(postId: number | string): Observable<any> {
    return this.backend
      .get(`/posts/${postId}/comments`)
      .pipe(map(response => response.data));
  }

  createComment(postId: number | string, comment: PostComment): Observable<PostComment> {
    return this.backend
      .post(`/posts/${postId}/comments`, { comment })
      .pipe(map(response => response.data));
  }
}
