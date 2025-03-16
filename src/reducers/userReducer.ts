import {
  USER_SET_INFO,
  USER_SHOULD_SHOW_LOGOUT_POPOVER,
  UserAction,
} from 'src/actions/userActions';
import { User } from 'src/types';

export type UserInitialStateType = {
  user: User | null;
  shouldShowLogoutPopover: boolean;
};

export const userInitialState: UserInitialStateType = {
  user: null,
  shouldShowLogoutPopover: false,
};

export const userReducer = (state = userInitialState, action: UserAction): UserInitialStateType => {
  switch (action.type) {
    case USER_SET_INFO:
      return {
        ...state,
        user: action.payload,
      };

    case USER_SHOULD_SHOW_LOGOUT_POPOVER:
      return {
        ...state,
        shouldShowLogoutPopover: action.payload,
      };

    default:
      return state;
  }
};
