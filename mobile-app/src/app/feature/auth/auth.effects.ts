import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tokenEntered, userAuthenticated } from './redux/auth.actions';
import { switchMap, map, tap} from 'rxjs/operators';
import { SocketService } from '../socket/socket.service';
import { MessageTypes } from 'src/app/message/message-types';
import { noop } from 'src/app/redux/app.actions';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Foundry } from '../foundry/foundry.models';

@Injectable()
export class AuthEffects {
  tokenEntered$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tokenEntered),
      switchMap(async ({ token }): Promise<Foundry.User> => await this._socketService.emit<Foundry.User>(MessageTypes.TOKEN_ENTERED, true, token)),
      tap(async user => {
        if (!user) {
          const toast = await this._toastController.create({
            animated: true,
            duration: 2000,
            header: 'Authentication Failed',
            message: 'Incorrect token entered'
          });

          void toast.present();
        }
      }),
      map(user => user ? userAuthenticated({ user }) : noop())
    )
  );

  userAuthenticated$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userAuthenticated),
      tap(() => {
        void this._router.navigate(['/home']);
      })
    ), { dispatch: false }
  )

  constructor(
    private _actions$: Actions,
    private _router: Router,
    private _socketService: SocketService,
    private _toastController: ToastController
  ) {}
}
