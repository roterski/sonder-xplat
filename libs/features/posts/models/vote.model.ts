export interface Vote {
  id: number;
  voterId: number;
  postId: number;
  commentId: number;
  points: -1 | 0 | 1;
}
