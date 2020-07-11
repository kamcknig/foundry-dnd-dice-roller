import { createAction, props } from '@ngrx/store';
import { JournalEntry } from '../../foundry/foundry.models';

enum JournalActions {
  journalEntriesReceived = 'Journal Entries Received'
}

export const journalEntriesReceived = createAction(
  JournalActions.journalEntriesReceived,
  props<{ entries: JournalEntry[] | Partial<JournalEntry>[] }>()
);
