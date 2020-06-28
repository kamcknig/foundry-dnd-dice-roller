import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard as AuthGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./feature/auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./feature/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
