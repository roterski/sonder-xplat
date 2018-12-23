export interface Vote {
  id: number | string;
  voterId: number;
  postId: number;
  commentId: number;
  points: -1 | 0 | 1;
}
