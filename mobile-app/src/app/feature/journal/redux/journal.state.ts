import { Foundry } from '../../foundry/foundry.models';

export const journalStateKey: string = 'journal';

export interface JournalState {
  entries: Foundry.JournalEntry[];
}

export const initialState: JournalState = {
  entries: []
};
