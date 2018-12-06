import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';

import { StateManagementModule } from '@sonder/features/state-management';
import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';
import { AuthModule } from './features/auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [CoreModule, SharedModule, AppRoutingModule, StateManagementModule, AuthModule],
  declarations: [AppComponent],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
