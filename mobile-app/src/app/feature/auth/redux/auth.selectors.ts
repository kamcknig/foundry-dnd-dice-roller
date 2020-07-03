import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authStateKey } from './auth.state';
import { User } from '../../foundry/foundry.models';

export const selectAuthState = createFeatureSelector<AuthState>(authStateKey);

export const selectUser = createSelector<null, AuthState, User>(
  selectAuthState,
  state => state?.user
);
