import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { IonicModule } from '@ionic/angular';
import { SocketModule } from '../socket/socket.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const modules = [
  CommonModule,
  IonicModule,
  SocketModule,
  HttpClientModule,
  MatExpansionModule,
  FormsModule,
  ReactiveFormsModule
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
