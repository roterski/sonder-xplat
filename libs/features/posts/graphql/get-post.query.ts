import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Post, PostComment } from '../models';

export interface PostWithComments extends Post {
  comments: PostComment[];
}

export interface GetPostGQLResponse {
  getPost: PostWithComments;
}

@Injectable({
  providedIn: 'root',
})

export class GetPostGQL extends Query<GetPostGQLResponse> {
  document = gql`
    query ($postId: Int) {
      getPost(id: $postId) {
        id
        title
        body
        points
        comments {
          id
          body
          postId
          parentIds
        }
      }
    }
  `;
}
