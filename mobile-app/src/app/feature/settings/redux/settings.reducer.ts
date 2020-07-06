import { createReducer, on, Action } from "@ngrx/store";
import { initialState, SettingsState } from './settings.state';
import { updateSetting } from './settings.actions';

const reducer = createReducer(
  initialState,
  on(updateSetting, (state, { setting, value }) => ({
    ...state,
    [setting]: value
  }))
);

export const settingsReducer = (state: SettingsState = initialState, action: Action) => {
  return reducer(state, action);
}
