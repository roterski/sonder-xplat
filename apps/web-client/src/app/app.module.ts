import { NgModule } from '@angular/core';
// libs
import { AppApolloModule } from '@sonder/features/app-apollo';
import { environment } from '@sonder/core';
// import { LogOutApolloService, LogOutService } from '@sonder/features/auth';
// import {
//   PostsService,
//   PostsApolloService,
//   PostsAkitaService
// } from '@sonder/features/posts';

// app
import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AuthModule } from './features/auth/auth.module';
import { PostsModule } from './features/posts/posts.module';
import { ProfilesModule } from './features/profiles/profiles.module';
import { ProfileComponent } from '@sonder/web/features/profiles';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
    environment.production
      ? []
      : [AkitaNgDevtools.forRoot(), AkitaNgRouterStoreModule.forRoot()],
    AppApolloModule,
    AuthModule,
    ProfilesModule,
    PostsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    // ProfileComponent
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}
