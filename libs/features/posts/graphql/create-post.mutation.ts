import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class CreatePostGQL extends Mutation {
  document = gql`
    mutation createPost($title: String!, $body: String) {
      createPost(createPostInput: { title: $title, body: $body }) {
        id
        title
        body
      }
    }
  `;
}
