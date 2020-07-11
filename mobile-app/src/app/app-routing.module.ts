import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard as AuthGuard } from './guards/auth-guard.guard';
import { AuthModule } from './feature/auth/auth.module';
import { HomeModule } from './feature/home/home.module';
import { JournalModule } from './feature/journal/journal.module';
import { MacroModule } from './feature/macro/macro.module';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: (): Promise<AuthModule> => import('./feature/auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: (): Promise<HomeModule> => import('./feature/home/home.module').then( m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'journal',
    loadChildren: (): Promise<JournalModule> => import('./feature/journal/journal.module').then( m => m.JournalModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'macros',
    loadChildren: (): Promise<MacroModule> => import('./feature/macro/macro.module').then( m => m.MacroModule),
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
