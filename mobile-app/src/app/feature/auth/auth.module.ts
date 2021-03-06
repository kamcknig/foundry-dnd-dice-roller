import { NgModule } from '@angular/core';
import { ChooseUserComponent } from './choose-user/choose-user.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './redux/auth.reducers';
import { authStateKey } from './redux/auth.state';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: ChooseUserComponent }
];

@NgModule({
  declarations: [
    ChooseUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(authStateKey, authReducer)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
