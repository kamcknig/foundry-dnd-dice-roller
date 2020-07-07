import { Inject, Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MessageTypes } from 'src/app/message/message-types';
import { User } from '../foundry/foundry.models';
import { foundryUserListReceived } from '../foundry/redux/foundry.actions';
import { FoundryState } from '../foundry/redux/foundry.state';
import { selectSetting } from '../settings/redux/settings.selectors';
import { SettingsState } from '../settings/redux/settings.state';
import { COMPANION_SOCKET } from './socket.module';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {
  private _connectedSub$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public connected$: Observable<boolean> = this._connectedSub$.asObservable();

  private _destroy$: Subject<void> = new Subject<void>();
  private _previousHost: string;

  constructor(
    private _socket: Socket,
    private _foundryStore: Store<FoundryState>,
    private _settingsStore: Store<SettingsState>,
    @Inject(COMPANION_SOCKET) private _companionSocket: BehaviorSubject<Socket>
  ) {
    /**
     * this is a little confusing. I wanted to handle the scenario where a user will change
     * the host url. I couldn't find anyway in the socket io module to change the url. So instead,
     * I created an injection token named COMPANION_SOCKET. This injection token will inject a j
     * BehaviorSubject<Socket> instnance. When first creating the SocketService, we get a handle
     * to the Socket instance provided the socket module that's created from teh SocketIOModule.forRoot method
     * in AppModule and we send that in the BehaviorSubject. When the host changes, we disconnect the Socket
     * instance and create a brand new one. This new socket is 'nexted' in the BehaviorSubject associated
     * with the InjectionToken. Anyone that wants the current instance of Socket beingused should inject
     * the COMPANION_SOCKET and NOT the normal Socket
     */
    this._companionSocket.next(_socket);

    this._socket.once('connect', this.socketConnected);
    this._socket.once('disconnect', this.socketDisconnected);

    this._settingsStore.pipe(
      select(selectSetting('host')),
      take(1)
    ).subscribe(value => {
      this._previousHost = value;
    });

    this._settingsStore.pipe(select(selectSetting('host')), takeUntil(this._destroy$)).subscribe(this.handleHostChanged);

    // observable to obtain the up-to-date users list when the server sends it
    // TODO: should this be moved elsewhere? would all consumers of socket service care about this?
    this._socket.fromEvent<User[]>(MessageTypes.USER_LIST).pipe(
      takeUntil(this._destroy$)
    ).subscribe(users => {
      this._foundryStore.dispatch(foundryUserListReceived({ users }));
    });
  }

  private handleHostChanged = (newHost: string): void => {
    if (newHost === this._previousHost) {
      return;
    }

    console.log('disconnecting old socket');
    this._socket.disconnect();

    this._socket = new Socket({
      url: `${newHost}/mobile`
    });

    this._previousHost = newHost;
    this._socket.once('connect', this.socketConnected);
    this._socket.once('disonnect', this.socketDisconnected);
    this._socket.connect();
  }

  private socketConnected = (): void => {
    console.log('Connected to socket server');
    void this.emit(MessageTypes.REQUEST_USER_LIST);
    this._connectedSub$.next(true);
  }

  private socketDisconnected = (reason: string): void => {
    console.log(`Diconnected from socket server. '${reason}'`);
    this._connectedSub$.next(false);
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
