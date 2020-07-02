import { createReducer, on, Action } from '@ngrx/store';
import { initialState, FoundryState } from './foundry.state';
import { foundryUserListReceived } from './foundry.actions';

const reducer = createReducer(
  initialState,
  on(foundryUserListReceived, (state, { users }) => ({
    ...state,
    users: [
      ...users
    ]
  }))
);

export const foundryReducer = (state: FoundryState = initialState, action: Action): FoundryState => {
  return reducer(state, action);
}