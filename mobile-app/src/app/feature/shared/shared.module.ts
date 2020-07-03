import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SocketModule } from '../socket/socket.module';
import { HttpClientModule } from '@angular/common/http';

const modules = [
  CommonModule,
  IonicModule,
  SocketModule,
  HttpClientModule
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
