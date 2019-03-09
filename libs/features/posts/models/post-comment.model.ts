export interface PostComment {
  id: number;
  postId: number;
  body: string;
  parentIds: Array<number>;
  points: number;
  voted: number;
  childrenIds?: Array<number>;
}

export function createComment(params: Partial<PostComment>) {
  return {
    body: '',
    points: 0,
    voted: 0
  } as PostComment;
}
