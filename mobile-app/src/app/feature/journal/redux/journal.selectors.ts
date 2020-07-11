import { createSelector, createFeatureSelector } from '@ngrx/store';
import { journalStateKey, JournalState } from './journal.state';

export const selectJournalState = createFeatureSelector<JournalState>(journalStateKey);

export const selectJournalEntries = createSelector(
  selectJournalState,
  state => state?.entries ?? []
)