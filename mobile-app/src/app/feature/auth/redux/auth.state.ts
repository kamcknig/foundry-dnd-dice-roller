import { AppState } from 'src/app/redux/app.reducers';
import { Foundry } from '../../foundry/foundry.models';

export const authStateKey: string = 'auth';

export interface AuthState extends AppState {
  user: Foundry.User;
}

export const initialState: AuthState = {
  user: undefined
};
