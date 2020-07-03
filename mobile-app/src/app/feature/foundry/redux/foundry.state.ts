import { AppState } from 'src/app/redux/app.reducers';
import { User } from '../foundry.models';

export const foundryStateKey: string = 'foundry';

export interface FoundryState extends AppState {
  users: User[];
}

export const initialState = {
  users: []
}
