import { Foundry } from '../../foundry/foundry.models';

export const macroStateKey: string = 'macro';

export interface MacroState {
  macros: { slot: number, macro: Foundry.Macro }[];
  retrieved: boolean;
}

export const initialState: MacroState = {
  macros: [],
  retrieved: false
}
