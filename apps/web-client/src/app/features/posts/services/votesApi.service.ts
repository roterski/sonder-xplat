import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vote } from '../models';
import { BackendService } from '../../auth/services/backend.service';

@Injectable({
  providedIn: 'root'
})
export class VotesApiService {
  constructor(private backend: BackendService) { }

  getPostVotes(): Observable<Vote[]> {
    return this.backend
      .get('/votes/posts')
      .pipe(map(response => response.data));
  }

  getCommentVotes(postId: ID): Observable<Vote[]> {
    return this.backend
      .get(`/votes/posts/${postId}/comments`)
      .pipe(map(response => response.data));
  }

  upvote(targetClass: 'posts' | 'comments', targetId: ID): Observable<any> {
    return this.backend
      .post(`/${targetClass}/${targetId}/upvote`)
      .pipe(map(response => response.data));
  }

  downvote(targetClass: 'posts' | 'comments', targetId: ID): Observable<any> {
    return this.backend
      .post(`/${targetClass}/${targetId}/downvote`)
      .pipe(map(response => response.data));
  }

  revokeVote(targetClass: 'posts' | 'comments', targetId: ID): Observable<any> {
    return this.backend
      .post(`/${targetClass}/${targetId}/revoke_vote`)
      .pipe(map(response => response.data));
  }
}
