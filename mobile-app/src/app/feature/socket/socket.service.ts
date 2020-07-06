import { Injectable, OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MessageTypes } from 'src/app/message/message-types';
import { takeUntil, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { FoundryState } from '../foundry/redux/foundry.state';
import { foundryUserListReceived } from '../foundry/redux/foundry.actions';
import { User } from '../foundry/foundry.models';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();
  private _connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public connected$: Observable<boolean> = this._connected$.asObservable();

  constructor(
    private _socket: Socket,
    private _store: Store<FoundryState>
  ) {
    this._socket.on('connect', this.socketConnected);
    this._socket.on('disconnect', this.socketDisconnected);

    // observable to obtain the up-to-date users list when the server sends it
    this._socket.fromEvent<User[]>(MessageTypes.USER_LIST).pipe(
      takeUntil(this._destroy$)
    ).subscribe(users => {
      this._store.dispatch(foundryUserListReceived({ users }));
    });
  }

  private socketConnected = (): void => {
    console.log('Connected to socket server');
    this._connected$.next(true);
    void this.emit(MessageTypes.REQUEST_USER_LIST);
  }

  private socketDisconnected = (reason: string): void => {
    console.log(`Diconnected from socket server. '${reason}'`);
    this._connected$.next(false);
  }

  public async emit<T>(eventName: MessageTypes, callback: boolean = false, ...args: any[]): Promise<T> {
    if (!args) {
      args = [];
    }

    if (callback) {
      const result = await new Promise<T>(
        resolve => {
          this._socket.emit(
            eventName,
            ...args,
            (...resultArgs) => resolve(resultArgs.length === 1 ? resultArgs[0] : (resultArgs.length === 0 ? undefined : resultArgs))
          )
        }
      );
      return result;
    }

    console.log(`Emitting ${eventName} to socket server`);
    this._socket.emit(eventName, ...args);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
  }
}
