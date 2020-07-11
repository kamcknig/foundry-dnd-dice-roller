import { AppState } from 'src/app/redux/app.reducers';
import { Foundry } from '../foundry.models';

export const foundryStateKey: string = 'foundry';

export interface FoundryState extends AppState {
  users: Foundry.User[];
}

export const initialState = {
  users: []
}
