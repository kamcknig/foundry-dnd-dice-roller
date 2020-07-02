import { User } from '../foundry.models';
import { AppState } from 'src/app/redux/app.reducers';

export const foundryStateKey: string = 'foundry';

export interface FoundryState extends AppState {
  users: User[];
}

export const initialState = {
  users: []
}
