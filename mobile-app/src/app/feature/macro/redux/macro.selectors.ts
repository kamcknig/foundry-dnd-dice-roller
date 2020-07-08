import { createFeatureSelector, createSelector } from '@ngrx/store';
import { macroStateKey, MacroState } from './macro.state';
import { selectUser } from '../../auth/redux/auth.selectors';

export const selectMacroState = createFeatureSelector<MacroState>(macroStateKey);

export const selectMacros = createSelector(
  selectUser,
  state => state?.macros?.filter(m => !!m.macro) ?? []
)