import { createAction, props } from "@ngrx/store";
import { User } from './auth.state';

export enum AuthActions {
  USER_SELECTED = 'User Selected'
};

export const userSelected = createAction(
  AuthActions.USER_SELECTED,
  props<User>()
);
