import { combineReducers } from 'redux';
import { loginReducer } from 'src/reducers/loginReducer';
import { userReducer } from 'src/reducers/userReducer';

export const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
