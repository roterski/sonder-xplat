import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Post } from '../models';

export interface GetPostsGQLResponse {
  getPosts: Post[];
}

@Injectable({
  providedIn: 'root'
})
export class GetPostsGQL extends Query<GetPostsGQLResponse> {
  document = gql`
    query getPosts {
      getPosts {
        id
        title
      }
    }
  `;
}
