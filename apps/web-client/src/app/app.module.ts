import { NgModule } from '@angular/core';

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
// libs
import { environment } from '@sonder/core';

// app
import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AuthenticatedAppComponent } from './containers';
import { TopNavBarComponent, BottomButtonsComponent } from './components';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { AuthModule } from './features/auth/auth.module';
import { PostsModule } from './features/posts/posts.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
    environment.production
      ? [] : [AkitaNgDevtools.forRoot(), AkitaNgRouterStoreModule.forRoot()],
    MatToolbarModule,
    MatButtonModule,
    AuthModule,
    PostsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    TopNavBarComponent,
    AuthenticatedAppComponent,
    BottomButtonsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
