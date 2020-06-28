import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authStateKey } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>(authStateKey);

export const selectUser = createSelector(
  selectAuthState,
  state => state?.user
);
