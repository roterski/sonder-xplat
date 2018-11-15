import { ID } from '@datorama/akita';

export interface Vote {
  id: ID;
  voterId: number;
  postId: number;
  commentId: number;
  points: -1 | 0 | 1;
}
