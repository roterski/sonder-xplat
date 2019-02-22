import { Observable } from 'rxjs';
import { Post, PostComment } from '@sonder/features';

export class PostsService {
  constructor() {}

  loadPosts(): Observable<Post[]> {
    throw new Error('must reimplement in an inherited class');
  }

  loadPostWithComments(postId: number): Observable<{post: Post, comments: PostComment[]}> {
    throw new Error('must reimplement in an inherited class');
  }

  createPost(post: Post): Observable<Post> {
    throw new Error('must reimplement in an inherited class');
  }

  parseValidationErrors(errors: any): { [key: string]: string } {
    return errors.reduce((acc, err) => {
      acc[err.property] = Object.values(err.constraints).join(', ');
      return acc;
    }, {});
  }
}
