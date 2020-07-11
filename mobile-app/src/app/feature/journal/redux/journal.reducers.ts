import { Action, createReducer, on } from '@ngrx/store';
import { journalEntriesReceived } from './journal.actions';
import { initialState, JournalState } from "./journal.state";

const reducer = createReducer(
  initialState,
  on(journalEntriesReceived, (state: JournalState, action) => ({
    ...state,
    entries: [
      ...action.entries
    ]
  }))
);

export const journalReducer = (state: JournalState = initialState, action: Action) =>
  reducer(state, action);