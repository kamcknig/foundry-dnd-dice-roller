import { createReducer, on, Action } from '@ngrx/store';
import { initialState, AuthState } from './auth.state';
import { userAuthenticated } from './auth.actions';

const reducer = createReducer(
  initialState,
  on(userAuthenticated, (state, { user }) => ({
    ...state,
    user: {
      ...user
    }
  }))
);

export const authReducer = (state: AuthState = initialState, action: Action) => {
  return reducer(state, action);
};
