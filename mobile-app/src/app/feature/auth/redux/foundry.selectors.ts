import { createFeatureSelector, createSelector } from '@ngrx/store';
import { foundryStateKey, FoundryState } from '../../foundry/redux/foundry.state';

export const selectFoundryState = createFeatureSelector<FoundryState>(foundryStateKey);

export const selectFoundryUsers = createSelector(
  selectFoundryState,
  state => state.users ?? []
);
