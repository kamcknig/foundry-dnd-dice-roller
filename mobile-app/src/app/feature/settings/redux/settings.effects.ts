import { Actions, createEffect, ofType } from '@ngrx/effects';
import { showUpdateHost, updateHost, updateSetting } from './settings.actions';
import { tap, switchMap, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { UpdateHostDialogComponent } from '../components/update-host-dialog/update-host-dialog.component';
import { Injectable } from '@angular/core';

@Injectable()
export class SettingsEffects {
  showUpdateHostDialog$ = createEffect(() =>
    this._actions$.pipe(
      ofType(showUpdateHost),
      switchMap(async () => {
        const modal = await this._modalController.create({
          component: UpdateHostDialogComponent,
          backdropDismiss: true,
          showBackdrop: true
        });

        modal.present();
        return modal.onWillDismiss<string>();
      }),
      map(({ data: host }) => {
        return updateSetting({ setting: 'host', value: host });
      })
    )
  );

  constructor(
    private _actions$: Actions,
    private _modalController: ModalController
  ) {}
}
