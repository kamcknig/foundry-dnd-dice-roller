import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/feature/foundry/foundry.models';

export enum AuthActions {
  TOKEN_ENTERED = 'Token Entered',
  USER_AUTHENTICATED = 'User Authenticated'
};

export const tokenEntered = createAction(
  AuthActions.TOKEN_ENTERED,
  props<{ token: string }>()
);

export const userAuthenticated = createAction(
  AuthActions.USER_AUTHENTICATED,
  props<User>()
);