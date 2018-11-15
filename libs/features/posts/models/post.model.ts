import { ID } from '@datorama/akita';
import { Author } from './author.model';
import { Tag } from './tag.model';

export interface Post {
  id: ID;
  title: string;
  body: string;
  author: Author;
  points: number;
  voted: number;
  commentCount: number;
}

export function createPost(params: Partial<Post>) {
  return {
    title: '',
    body: '',
    points: 0,
    voted: 0,
    commentCount: 0
  } as Post;
}
