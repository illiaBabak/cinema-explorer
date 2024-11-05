import {
  LOGIN_SET_ERROR,
  LOGIN_SET_LOADING,
  LOGIN_SET_NAME,
  LOGIN_SET_PASSWORD,
  LOGIN_SET_SESSION_ID,
  LOGIN_SET_SHOW_PASSWORD,
  LoginAction,
} from 'src/actions/loginActions';

export type LoginInitialState = {
  name: string;
  password: string;
  sessionId: string | null;
  error: string | undefined;
  shouldShowPassword: boolean;
  isLoading: boolean;
};

export const initialState = {
  name: '',
  password: '',
  sessionId: null,
  error: undefined,
  shouldShowPassword: false,
  isLoading: false,
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

    case LOGIN_SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case LOGIN_SET_SHOW_PASSWORD: {
      return {
        ...state,
        shouldShowPassword: action.payload,
      };
    }

    case LOGIN_SET_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    default:
      return state;
  }
};
