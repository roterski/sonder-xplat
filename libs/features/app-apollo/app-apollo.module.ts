import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { tap, take } from 'rxjs/operators';

import { HttpClientModule } from '@angular/common/http';
import { Apollo, ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import * as _ from 'lodash';

import { environment } from '@sonder/core';
import { SessionQuery, LogOutService } from '@sonder/features/auth';
import { resolvers, defaults, typeDefs } from './schema';

@NgModule({
  imports: [ApolloModule, HttpLinkModule],
  exports: [ApolloModule, HttpLinkModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppApolloModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    router: Router,
    sessionQuery: SessionQuery,
    logOutService: LogOutService
  ) {
    const http = httpLink.create({
      uri: `${environment.backendUrl}/graphql`
    });
    const cache = new InMemoryCache();

    const errorLink = onError(({ graphQLErrors, response, networkError }) => {
      const statusCode = _.get(response, 'errors[0].message.statusCode');
      if (statusCode === 401) {
        logOutService.logOut().subscribe(() => router.navigate(['/login']));
      }
    });

    const auth = setContext((_, { headers }) => {
      const token = sessionQuery.backendToken();

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
