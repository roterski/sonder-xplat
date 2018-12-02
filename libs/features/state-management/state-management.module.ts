import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { Apollo, ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';

import { environment } from '@sonder/core';

import { resolvers, defaults, typeDefs } from './schema';

@NgModule({
  imports: [
    ApolloModule,
    HttpLinkModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory(httpLink: HttpLink, apollo: Apollo) {
      const http = httpLink.create({
        uri: `${environment.backendUrl}/graphql`
      });

      const cache = new InMemoryCache();

      const auth = setContext((_, { headers }) => {
        const token = localStorage.getItem('authToken');
        if (!token) {
          return {};
        } else {
          return {
            headers: {
              ...(headers || {}),
              'Authorization': `Bearer ${token}`
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

      return {
        cache,
        link: ApolloLink.from([
          local,
          auth,
          http,
        ])
      }
    },
    deps: [HttpLink]
  }],
})
export class StateManagementModule {}
