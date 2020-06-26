import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageTypes } from 'src/app/message/message-types';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private _connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public connected$: Observable<boolean> = this._connected$.asObservable();

  public users$: Observable<any>;

  constructor(private socket: Socket) {
    console.log('Socket service created');

    this.socket.on('connect', this.socketConnected);
    this.socket.on('disconnect', this.socketDisconnected);

    // observable to obtain the up-to-date users list when the server sends it
    this.users$ = this.socket.fromEvent(MessageTypes.USER_LIST);
  }

  private socketConnected = (): void => {
    this._connected$.next(true);
  }

  private socketDisconnected = (reason): void => {
    this._connected$.next(false);
  }

  public emit(eventName: MessageTypes, callback: (response) => void | Promise<any>, ...args) {
    this.socket.emit(eventName, ...args, callback);
  }
}
