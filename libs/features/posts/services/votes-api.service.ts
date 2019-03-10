import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vote } from '../models';
import { BackendService } from '@sonder/features/auth/services/backend.service';

@Injectable({
  providedIn: 'root'
})
export class VotesApiService {
  constructor(private backend: BackendService) {}

  getPostVotes(): Observable<Vote[]> {
    return this.backend
      .get('/votes/posts')
      .pipe(map(response => response.data));
  }

  getCommentVotes(postId: number): Observable<Vote[]> {
    return this.backend
      .get(`/votes/posts/${postId}/comments`)
      .pipe(map(response => response.data));
  }

  upvote(
    targetClass: 'posts' | 'comments',
    targetId: number
  ): Observable<any> {
    return this.backend
      .post(`/${targetClass}/${targetId}/upvote`)
      .pipe(map(response => response.data));
  }

  downvote(
    targetClass: 'posts' | 'comments',
    targetId: number
  ): Observable<any> {
    return this.backend
      .post(`/${targetClass}/${targetId}/downvote`)
      .pipe(map(response => response.data));
  }

  revokeVote(
    targetClass: 'posts' | 'comments',
    targetId: number
  ): Observable<any> {
    return this.backend
      .post(`/${targetClass}/${targetId}/revoke_vote`)
      .pipe(map(response => response.data));
  }
}
