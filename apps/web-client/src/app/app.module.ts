import { NgModule } from '@angular/core';

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';

import { HttpClientModule } from '@angular/common/http';
import { Apollo, ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

// libs
import { environment } from '@sonder/core';

// app
import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AuthModule } from './features/auth/auth.module';
import { PostsModule } from './features/posts/posts.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
    ApolloModule,
    HttpLinkModule,
    environment.production
      ? []
      : [AkitaNgDevtools.forRoot(), AkitaNgRouterStoreModule.forRoot()],
    AuthModule,
    PostsModule,
    BrowserAnimationsModule
  ],
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
          return { headers: {
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
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
