import { Author } from './author.model';

export interface PostComment {
  id: number | string;
  postId: number | string;
  body: string;
  author: Author;
  parentIds: Array<number | string>;
  points: number;
  voted: number;
  childrenIds: Array<number | string>;
}

export function createComment(params: Partial<PostComment>) {
  return {
    body: '',
    points: 0,
    voted: 0
  } as PostComment;
}
