import { createAction, props } from '@ngrx/store';

export enum SettingsActions {
  UPDATE_SETTING = 'Update setting',
  SHOW_UPDATE_HOST = 'Show Update Host Dialog',
  UPDATE_HOST = 'UPDATE_HOST'
}

export const updateSetting = createAction(
  SettingsActions.UPDATE_SETTING,
  props<{ setting: string, value: any}>()
);

export const showUpdateHost = createAction(
  SettingsActions.SHOW_UPDATE_HOST
);

export const updateHost = createAction(
  SettingsActions.UPDATE_HOST,
  props<{ host: string }>()
)
