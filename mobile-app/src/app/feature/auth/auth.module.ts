import { NgModule } from '@angular/core';
import { ChooseUserComponent } from './choose-user/choose-user.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ChooseUserComponent }
];

@NgModule({
  declarations: [
    ChooseUserComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
