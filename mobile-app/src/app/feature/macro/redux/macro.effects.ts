import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { showMacroDialog } from './macro.actions';
import { ModalController } from '@ionic/angular';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { MacroState } from './macro.state';
import { selectMacros } from './macro.selectors';
import { MacroDialogComponent } from '../components/macro-dialog/macro-dialog.component';

@Injectable()
export class MacroEffects {
  showMacroDialog$ = createEffect(() =>
    this._actions$.pipe(
      ofType(showMacroDialog),
      switchMap(() => this._macroStore$.pipe(select(selectMacros))),
      switchMap(async macros => {
        const modal = await this._modalController.create({
          component: MacroDialogComponent,
          animated: true,
          backdropDismiss: true,
          keyboardClose: true,
          showBackdrop: true,
          swipeToClose: true,
          componentProps: {
            macros
          }
        });

        await modal.present();
        return modal.onWillDismiss();
      }),
      map(result => {
        console.log(result);
      }),
      catchError((err, ob) => {
        console.log('errored');
        console.log(err);
        return ob;
      })
    ), { dispatch: false }
  )
  constructor(
    private _actions$: Actions,
    private _modalController: ModalController,
    private _macroStore$: Store<MacroState>
  ) {}
}