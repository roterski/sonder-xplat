import { Observable } from 'rxjs';
import { Post, PostComment } from '@sonder/features';

export class PostsService {
  constructor() {}

  loadPosts(): Observable<Post[]> {
    throw new Error('must be reimplemented in a subclass');
  }

  loadPostWithComments(
    postId: number
  ): Observable<{ post: Post; comments: PostComment[] }> {
    throw new Error('must be reimplemented in a subclass');
  }

  createPost(post: Post): Observable<Post> {
    throw new Error('must be reimplemented in a subclass');
  }

  createComment(postId: number, comment: PostComment): Observable<PostComment> {
    throw new Error('must be reimplemented in a subclass');
  }

  parseValidationErrors(errors: any): { [key: string]: string } {
    return errors.reduce((acc, err) => {
      acc[err.property] = Object.values(err.constraints).join(', ');
      return acc;
    }, {});
  }
}
