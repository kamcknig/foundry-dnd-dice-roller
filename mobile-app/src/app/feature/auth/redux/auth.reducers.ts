import { createReducer, on, Action } from '@ngrx/store';
import { userSelected } from './auth.actions';
import { initialState, AuthState } from './auth.state';

const reducer = createReducer(
  initialState,
  on(userSelected, (state = initialState, user) => ({
    ...state,
    user: {
      ...user
    }
  }))
);

export const authReducer = (state: AuthState = initialState, action: Action): AuthState => {
  return reducer(state, action);
};
