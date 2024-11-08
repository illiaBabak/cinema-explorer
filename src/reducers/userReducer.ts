import { act } from 'react';
import { USER_SET_INFO, USER_SHOULD_SHOW_LOGOUT_WINDOW, UserAction } from 'src/actions/userActions';
import { User } from 'src/types';

export type UserInitialStateType = {
  user: User | null;
  shouldShowLogoutWindow: boolean;
};

export const userInitialState: UserInitialStateType = {
  user: null,
  shouldShowLogoutWindow: false,
};

export const userReducer = (state = userInitialState, action: UserAction): UserInitialStateType => {
  switch (action.type) {
    case USER_SET_INFO:
      return {
        ...state,
        user: action.payload,
      };

    case USER_SHOULD_SHOW_LOGOUT_WINDOW:
      return {
        ...state,
        shouldShowLogoutWindow: action.payload,
      };

    default:
      return state;
  }
};
