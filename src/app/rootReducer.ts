import { combineReducers } from 'redux';
import { loginReducer } from 'src/reducers/loginReducer';
import { movieReducer } from 'src/reducers/movieReducer';
import { userReducer } from 'src/reducers/userReducer';

export const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  movie: movieReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
