export const settingsStateKey: string = 'settings';

export interface SettingsState {
  'combat-turn-notification': boolean,
  'host': string
};

export const initialState: SettingsState = {
  'combat-turn-notification': true,
  'host': 'http://localhost:8082'
};
