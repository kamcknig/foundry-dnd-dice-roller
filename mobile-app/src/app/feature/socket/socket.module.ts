import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

export const COMPANION_SOCKET = new InjectionToken<BehaviorSubject<Socket>>('Socket');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule
  ],
  providers: [
    {
      provide: COMPANION_SOCKET, useValue: new BehaviorSubject<Socket>(null)
    }
  ]
})
export class SocketModule { }
