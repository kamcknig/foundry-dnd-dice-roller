export const macroStateKey: string = 'macro';

export interface MacroState {
  macros: { slot: number, macro: Macro }[];
  retrieved: boolean;
}

export interface Macro {
  [key: string]: any;
}

export const initialState: MacroState = {
  macros: [],
  retrieved: false
}
