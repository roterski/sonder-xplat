import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { PostWithoutTags, PostWithFullTags, PostComment, Tag } from '../models';
import { BackendService } from '@sonder/features/auth/services/backend.service';

@Injectable({
  providedIn: 'root'
})
export class PostsApiService {
  constructor(private backend: BackendService) {}

  getPosts(params: any = {}): Observable<PostWithFullTags[]> {
    return this.backend.get('/posts', params);
  }

  getPost(postId: number): Observable<PostWithFullTags> {
    return this.backend.get(`/posts/${postId}`).pipe(pluck('data'));
  }

  createPost(post: PostWithoutTags, tags: Tag[]): Observable<PostWithFullTags> {
    return this.backend.post('/posts', { post, tags }).pipe(pluck('data'));
  }

  getPostComments(postId: number): Observable<PostComment[]> {
    return this.backend.get(`/posts/${postId}/comments`).pipe(pluck('data'));
  }

  createComment(postId: number, comment: PostComment): Observable<PostComment> {
    return this.backend
      .post(`/posts/${postId}/comments`, { comment })
      .pipe(pluck('data'));
  }
}
