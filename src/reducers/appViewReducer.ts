import {
  APP_VIEW_SET_THEME,
  AppViewAction,
  APP_VIEW_SET_CURRENT_LANGUAGE,
  APP_VIEW_SET_LANGUAGES,
} from 'src/actions/appViewActions';
import { getLanguageFromParams } from 'src/utils/getLanguageFromParams';
import { getThemeFromStorage } from 'src/utils/getThemeFromStorage';

export type AppViewInitialStateType = {
  isLightTheme: boolean;
  currentLanguage: string;
  languages: string[];
};

export const pageInitialState: AppViewInitialStateType = {
  isLightTheme: getThemeFromStorage(),
  currentLanguage: getLanguageFromParams(),
  languages: [],
};

export const pageReducer = (
  state = pageInitialState,
  action: AppViewAction
): AppViewInitialStateType => {
  switch (action.type) {
    case APP_VIEW_SET_THEME:
      return {
        ...state,
        isLightTheme: action.payload,
      };

    case APP_VIEW_SET_CURRENT_LANGUAGE: {
      return {
        ...state,
        currentLanguage: action.payload,
      };
    }

    case APP_VIEW_SET_LANGUAGES: {
      return {
        ...state,
        languages: action.payload,
      };
    }

    default:
      return state;
  }
};
