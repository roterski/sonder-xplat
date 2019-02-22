// angular
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

// libs
import { LogOutService } from '@sonder/features/auth';
import {
  PostsService,
  PostsApolloService,
  PostsAkitaService
} from '@sonder/features/posts';

// app
import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';
import { AuthModule } from './features/auth';
import { PostsModule } from './features/posts/posts.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
    AuthModule,
    PostsModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    LogOutService,
    { provide: PostsService, useClass: PostsAkitaService }
  ]
})
export class AppModule {}
