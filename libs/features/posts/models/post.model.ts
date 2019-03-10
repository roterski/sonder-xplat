import { Tag } from './tag.model';

export interface Post {
  id: number;
  profileId: number;
  title: string;
  body: string;
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
