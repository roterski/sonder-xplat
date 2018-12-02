import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CreateCommentGQL extends Mutation {
  document = gql`
    mutation createComment($body: String!, $parentIds: [Int]!, $postId: Int!) {
      createComment(body: $body, parentIds: $parentIds, postId: $postId) {
        id
        body
        parentIds
        postId
      }
    }
  `;
}
