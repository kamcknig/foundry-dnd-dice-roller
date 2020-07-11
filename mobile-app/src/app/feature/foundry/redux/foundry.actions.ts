import { createAction, props } from '@ngrx/store';
import { Foundry } from '../foundry.models';

export enum FoundryActions {
  FOUNDRY_USER_ADDED = 'Foundry User Added'
}

export const foundryUserListReceived = createAction(
  FoundryActions.FOUNDRY_USER_ADDED,
  props<{ users: Foundry.User[] }>()
);
