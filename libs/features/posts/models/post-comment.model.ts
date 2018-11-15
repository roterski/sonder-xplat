import { ID } from '@datorama/akita';
import { Author } from './author.model';

export interface PostComment {
  id: ID;
  postId: ID;
  body: string;
  author: Author;
  parentIds: Array<ID>;
  points: number;
  voted: number;
  childrenIds: Array<ID>;
}

export function createComment(params: Partial<PostComment>) {
  return {
    body: '',
    points: 0,
    voted: 0
  } as PostComment;
}
