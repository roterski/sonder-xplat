import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';


import { HttpClientModule } from '@angular/common/http';
import { Apollo, ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

import { environment } from '@sonder/core';

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

      return {
        cache: new InMemoryCache(),
        link: auth.concat(http)
      }
    },
    deps: [HttpLink]
  }],
})
export class StateManagementModule {}
