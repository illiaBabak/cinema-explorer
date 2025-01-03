import { combineReducers } from 'redux';
import { loginReducer } from 'src/reducers/loginReducer';
import { movieReducer } from 'src/reducers/movieReducer';
import { pageReducer } from 'src/reducers/appViewReducer';
import { personReducer } from 'src/reducers/personReducer';
import { userReducer } from 'src/reducers/userReducer';

export const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  movie: movieReducer,
  appView: pageReducer,
  person: personReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
