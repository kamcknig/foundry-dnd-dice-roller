import { AppState } from 'src/app/redux/app.reducers';
import { User } from 'src/app/feature/foundry/foundry.models';

export const authStateKey: string = 'auth';

export interface AuthState extends AppState {
  user: User;
}

export const initialState: AuthState = {
  user: undefined
};
