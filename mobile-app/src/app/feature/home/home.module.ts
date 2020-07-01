import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';

import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {}
