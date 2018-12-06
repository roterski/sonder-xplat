import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from '@sonder/features/auth/guards';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/home/home.module#HomeModule',
    // canActivate: [AuthenticatedGuard]
  },
  {
    path: 'login',
    loadChildren: './features/auth/auth.module#AuthModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
