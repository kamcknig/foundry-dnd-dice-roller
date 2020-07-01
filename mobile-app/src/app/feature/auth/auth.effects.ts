import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { userSelected } from './redux/auth.actions';
import { tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { SocketService } from '../socket/socket.service';
import { MessageTypes } from 'src/app/message/message-types';

@Injectable()
export class AuthEffects {
  constructor(
    private _actions$: Actions,
    private _router: Router,
    private _socketService: SocketService
  ) {}

  userSelectedEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userSelected),
      tap(user => {
        this._socketService.emit(MessageTypes.USER_SELECTED, undefined, user._id);
        this._router.navigate(['/home']);
      })
    ), { dispatch: false }
  );
}
