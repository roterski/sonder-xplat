import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CreateCommentGQL extends Mutation {
  document = gql`
    mutation createComment($title: String!, $parentIds: [Int]!, $postId: Int!) {
      createComment(body: $body) {
        id
        title
        body
      }
    }
  `;
}
