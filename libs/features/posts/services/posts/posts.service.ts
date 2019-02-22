import { Observable } from 'rxjs';
import { Post, PostComment } from '@sonder/features';

export class PostsService {
  constructor() {}

  loadPosts(): Observable<Post[]> {
    throw new Error('must reimplement');
  }

  loadPostWithComments(postId: number): Observable<{post: Post, comments: PostComment[]}> {
    throw new Error('must reimplement');
  }
}
