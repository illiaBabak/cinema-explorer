export const LOGIN_SET_NAME = 'login_set_name';

export const LOGIN_SET_PASSWORD = 'login_set_password';

export const LOGIN_SET_SESSION_ID = 'login_set_session_id';

export const LOGIN_SET_ERROR = 'login_set_error';

export type LoginAction =
  | { type: typeof LOGIN_SET_NAME; payload: string }
  | { type: typeof LOGIN_SET_PASSWORD; payload: string }
  | { type: typeof LOGIN_SET_SESSION_ID; payload: string | null }
  | { type: typeof LOGIN_SET_ERROR; payload: string | undefined };

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
