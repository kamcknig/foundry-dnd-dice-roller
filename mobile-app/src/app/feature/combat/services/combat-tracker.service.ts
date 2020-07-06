import { Injectable, OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { MessageTypes } from 'src/app/message/message-types';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.reducers';
import { notifyCombatTurn } from '../redux/combat.actions';

@Injectable({
  providedIn: 'root'
})
export class CombatTrackerService implements OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _socket: Socket,
    private _store$: Store<AppState>
  ) { }

  public startTracking(): void {
    this._socket.fromEvent<void>(MessageTypes.UPDATE_COMBAT_TURN).pipe(
      takeUntil(this._destroy$),
      tap(() => {
        this._store$.dispatch(notifyCombatTurn());
      })
    ).subscribe(() => console.log('update combat turn'));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }
}
