import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { Apollo, ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';

import { environment } from '@sonder/core';

import { resolvers, defaults, typeDefs } from './schema';

@NgModule({
  imports: [ApolloModule, HttpLinkModule],
  exports: [ApolloModule, HttpLinkModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class StateManagementModule {
  constructor(apollo: Apollo, httpLink: HttpLink, router: Router) {
    const http = httpLink.create({
      uri: `${environment.backendUrl}/graphql`
    });

    const cache = new InMemoryCache();

    const isUnauthorized = (response) => (
      response &&
      response.errors &&
      response.errors[0] &&
      response.errors[0].message &&
      response.errors[0].message.statusCode === 401
    )

    const errorLink = onError(({ graphQLErrors, response, networkError }) => {
      if (isUnauthorized(response)) {
        apollo.getClient().resetStore();
        localStorage.clear();
        router.navigate(['/login']);
      }
    });

    const auth = setContext((_, { headers }) => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return {};
      } else {
        return {
          headers: {
            ...(headers || {}),
            Authorization: `Bearer ${token}`
          }
        };
      }
    });

    const local = withClientState({
      cache,
      resolvers,
      defaults,
      typeDefs
    });

    apollo.create({
      cache,
      link: ApolloLink.from([local, auth, errorLink, http])
    });
  }
}
