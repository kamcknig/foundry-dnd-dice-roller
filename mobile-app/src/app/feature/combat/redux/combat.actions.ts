import { createAction } from '@ngrx/store';

export enum CombatActions {
  NOTIFY_TURN = 'Notify Turn'
}

export const notifyCombatTurn = createAction(
  CombatActions.NOTIFY_TURN
);
