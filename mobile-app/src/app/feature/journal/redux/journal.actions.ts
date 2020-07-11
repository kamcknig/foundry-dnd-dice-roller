import { createAction, props } from '@ngrx/store';
import { Foundry } from '../../foundry/foundry.models';

enum JournalActions {
  journalEntriesReceived = 'Journal Entries Received'
}

export const journalEntriesReceived = createAction(
  JournalActions.journalEntriesReceived,
  props<{ entries: Foundry.JournalEntry[] | Partial<Foundry.JournalEntry>[] }>()
);
