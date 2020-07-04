import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SocketModule } from '../socket/socket.module';
import { HttpClientModule } from '@angular/common/http';
import {MatExpansionModule, MatAccordion} from '@angular/material/expansion';

const modules = [
  CommonModule,
  IonicModule,
  SocketModule,
  HttpClientModule,
  MatExpansionModule
];

@NgModule({
  declarations: [],
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ]
})
export class SharedModule { }
