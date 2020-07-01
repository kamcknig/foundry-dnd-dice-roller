import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/foundry/foundry.models';

export enum AuthActions {
  USER_SELECTED = 'User Selected'
};

export const userSelected = createAction(
  AuthActions.USER_SELECTED,
  props<User>()
);
