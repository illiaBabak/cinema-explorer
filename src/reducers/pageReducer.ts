import {
  PAGE_SET_CURRENT_LANGUAGE,
  PAGE_SET_LANGUAGES,
  PAGE_SET_THEME,
  PageAction,
} from 'src/actions/pageActions';
import { getLanguageFromParams } from 'src/utils/getLanguageFromParams';
import { getThemeFromStorage } from 'src/utils/getThemeFromStorage';

export type PageInitialStateType = {
  isLightTheme: boolean;
  currentLanguage: string;
  languages: string[];
};

export const pageInitialState: PageInitialStateType = {
  isLightTheme: getThemeFromStorage(),
  currentLanguage: getLanguageFromParams(),
  languages: [],
};

export const pageReducer = (state = pageInitialState, action: PageAction): PageInitialStateType => {
  switch (action.type) {
    case PAGE_SET_THEME:
      return {
        ...state,
        isLightTheme: action.payload,
      };

    case PAGE_SET_CURRENT_LANGUAGE: {
      return {
        ...state,
        currentLanguage: action.payload,
      };
    }

    case PAGE_SET_LANGUAGES: {
      return {
        ...state,
        languages: action.payload,
      };
    }

    default:
      return state;
  }
};
