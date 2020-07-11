import { JournalEntry } from '../../foundry/foundry.models';

export const journalStateKey: string = 'journal';

export interface JournalState {
  entries: JournalEntry[];
}

export const initialState: JournalState = {
  entries: []
};
