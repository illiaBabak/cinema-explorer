import { User } from 'src/types';

export const USER_SET_INFO = 'user_set_info';

export type UserAction = { type: typeof USER_SET_INFO; payload: User | null };

export const userSetInfo = (userInfo: User | null): UserAction => ({
  type: USER_SET_INFO,
  payload: userInfo,
});
