import { USER_SET_INFO, UserAction } from 'src/actions/userActions';
import { User } from 'src/types';

export type UserInitialStateType = {
  user: User | null;
};

export const UserInitialState: UserInitialStateType = {
  user: null,
};

export const userReducer = (state = UserInitialState, action: UserAction): UserInitialStateType => {
  switch (action.type) {
    case USER_SET_INFO:
      return {
        user: action.payload,
      };

    default:
      return state;
  }
};
