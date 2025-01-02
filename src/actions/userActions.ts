import { User } from 'src/types';

export const USER_SET_INFO = 'user_set_info';

export const USER_SHOULD_SHOW_LOGOUT_WINDOW = 'user_should_show_logout_window';

export type UserAction =
  | { type: typeof USER_SET_INFO; payload: User | null }
  | { type: typeof USER_SHOULD_SHOW_LOGOUT_WINDOW; payload: boolean };

export const userSetInfo = (userInfo: User | null): UserAction => ({
  type: USER_SET_INFO,
  payload: userInfo,
});

export const userShouldShowLogoutWindow = (shouldShowWindow: boolean): UserAction => ({
  type: USER_SHOULD_SHOW_LOGOUT_WINDOW,
  payload: shouldShowWindow,
});
