import { createFeatureSelector, createSelector } from '@ngrx/store';
import { settingsStateKey } from './settings.state';

export const selectSettingsState = createFeatureSelector(settingsStateKey);

export const selectSetting = settingName => {
  return createSelector(
    selectSettingsState,
    state => state[settingName]
  );
}
