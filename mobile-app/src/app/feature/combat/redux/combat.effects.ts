import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { userAuthenticated } from '../../auth/redux/auth.actions';
import { CombatTrackerService } from '../services/combat-tracker.service';
import { tap, withLatestFrom } from 'rxjs/operators';
import { notifyCombatTurn } from './combat.actions';
import { ToastController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { SettingsState } from '../../settings/redux/settings.state';
import { selectSetting } from '../../settings/redux/settings.selectors';

@Injectable()
export class CombatEffects {

  userAuthenticated$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userAuthenticated),
      tap(() => {
        this._combatTrackerService.startTracking();
      })
    ), { dispatch: false }
  );

  notifyCombatTurn$ = createEffect(() =>
      this._actions$.pipe(
        ofType(notifyCombatTurn),
        withLatestFrom(this._store.pipe(select(selectSetting('combat-turn-notification')))),
        tap(async ([, on]) => {
          if (!on) {
            return;
          }

          const toast = await this._toastController.create({
            animated: true,
            header: 'Combat!',
            message: `It's your turn!`,
            position: 'top',
            duration: 2000
          });

          toast.present();
          const a = new Audio('assets/sound/combat-turn.mp3');
          a.play();
        })
      ), { dispatch: false }
  );

  constructor(
    private _combatTrackerService: CombatTrackerService,
    private _actions$: Actions,
    private _toastController: ToastController,
    private _store: Store<SettingsState>
  ) {
    const a = new Audio('assets/sound/combat-turn.mp3');
  }
}