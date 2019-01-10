import { NgModule } from '@angular/core';

// libs
import { environment } from '@sonder/core';
import { AppApolloModule } from '@sonder/features/app-apollo';

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
    AppApolloModule,
    AuthModule,
    PostsModule,
    BrowserAnimationsModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
