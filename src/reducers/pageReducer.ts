import { PAGE_SET_THEME, PageAction } from 'src/actions/pageActions';
import { getThemeFromStorage } from 'src/utils/getThemeFromStorage';

export type PageInitialStateType = {
  isLightTheme: boolean;
};

export const pageInitialState: PageInitialStateType = {
  isLightTheme: getThemeFromStorage(),
};

export const pageReducer = (state = pageInitialState, action: PageAction): PageInitialStateType => {
  switch (action.type) {
    case PAGE_SET_THEME:
      return {
        ...state,
        isLightTheme: action.payload,
      };

    default:
      return state;
  }
};
