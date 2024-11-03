import {
  LOGIN_SET_NAME,
  LOGIN_SET_PASSWORD,
  LOGIN_SET_SESSION_ID,
  LoginAction,
} from 'src/actions/loginActions';

export type LoginInitialState = {
  name: string;
  password: string;
  sessionId: string | null;
};

export const initialState = {
  name: '',
  password: '',
  sessionId: null,
};

export const loginReducer = (state = initialState, action: LoginAction): LoginInitialState => {
  switch (action.type) {
    case LOGIN_SET_NAME:
      return {
        ...state,
        name: action.payload,
      };

    case LOGIN_SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };

    case LOGIN_SET_SESSION_ID:
      return {
        ...state,
        sessionId: action.payload,
      };

    default:
      return state;
  }
};
