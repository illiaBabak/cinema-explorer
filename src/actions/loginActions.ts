export const LOGIN_SET_NAME = 'login_set_name';

export const LOGIN_SET_PASSWORD = 'login_set_password';

export const LOGIN_SET_SESSION_ID = 'login_set_session_id';

export const LOGIN_SET_ERROR = 'login_set_error';

export const LOGIN_SET_SHOW_PASSWORD = 'login_set_show_password';

export const LOGIN_SET_LOADING = 'login_set_loading';

export type LoginAction =
  | { type: typeof LOGIN_SET_NAME; payload: string }
  | { type: typeof LOGIN_SET_PASSWORD; payload: string }
  | { type: typeof LOGIN_SET_SESSION_ID; payload: string | null }
  | { type: typeof LOGIN_SET_ERROR; payload: string | undefined }
  | { type: typeof LOGIN_SET_SHOW_PASSWORD; payload: boolean }
  | { type: typeof LOGIN_SET_LOADING; payload: boolean };

export const loginSetName = (name: string): LoginAction => ({
  type: LOGIN_SET_NAME,
  payload: name,
});

export const loginSetPassword = (password: string): LoginAction => ({
  type: LOGIN_SET_PASSWORD,
  payload: password,
});

export const loginSetSessionId = (token: string | null): LoginAction => ({
  type: LOGIN_SET_SESSION_ID,
  payload: token,
});

export const loginSetError = (error: string | undefined): LoginAction => ({
  type: LOGIN_SET_ERROR,
  payload: error,
});

export const loginSetShowPassword = (shouldShow: boolean): LoginAction => ({
  type: LOGIN_SET_SHOW_PASSWORD,
  payload: shouldShow,
});

export const loginSetIsLoading = (isLoading: boolean): LoginAction => ({
  type: LOGIN_SET_LOADING,
  payload: isLoading,
});
