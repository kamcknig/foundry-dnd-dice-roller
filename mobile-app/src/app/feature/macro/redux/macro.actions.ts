import { createAction } from '@ngrx/store';

export enum MacroActions {
  ShowMacroDialog = 'Show Macro Dialog'
}
export const showMacroDialog = createAction(
  MacroActions.ShowMacroDialog
);
