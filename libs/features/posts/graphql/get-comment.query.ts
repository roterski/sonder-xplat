import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Post, PostComment } from '../models';

export interface GetCommentGQLResponse {
  getComment: PostComment;
}

@Injectable({
  providedIn: 'root',
})

export class GetCommentGQL extends Query<GetCommentGQLResponse> {
  document = gql`
    query @client ($commentId: Int) {
      getComment(id: $commentId) {
        id
        body
        parentIds
        postId
      }
    }
  `;
}
