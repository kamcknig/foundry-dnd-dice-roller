import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageTypes } from 'src/app/message/message-types';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/foundry/foundry.models';

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
    this.users$ = this.socket.fromEvent(MessageTypes.USER_LIST).pipe(
      tap(users => {
        users.forEach((u: User) => {
          console.log(u);
        });
      })
    );
  }

  private socketConnected = (): void => {
    console.log('Connected to socket server');
    this.emit(MessageTypes.REQUEST_USER_LIST);

    this._connected$.next(true);
  }

  private socketDisconnected = (reason): void => {
    console.log('Diconnected from socket server');
    this._connected$.next(false);
  }

  public async emit<T>(eventName: MessageTypes, callback: boolean = false, ...args): Promise<T> {
    if (!args) {
      args = [];
    }

    if (callback) {
      const result = await new Promise<T>(
        resolve => this.socket.emit(
          eventName,
          ...args,
          (...resultArgs) => resolve(resultArgs.length === 1 ? resultArgs[0] : (resultArgs.length === 0 ? undefined : resultArgs))
        )
      );
      return result;
    }

    this.socket.emit(eventName, ...args);
  }
}
