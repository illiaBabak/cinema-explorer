export const APP_VIEW_SET_THEME = 'app_view_set_theme';

export const APP_VIEW_SET_CURRENT_LANGUAGE = 'app_view_set_current_language';

export const APP_VIEW_SET_LANGUAGES = 'app_view_set_languages';

export type AppViewAction =
  | { type: typeof APP_VIEW_SET_THEME; payload: boolean }
  | { type: typeof APP_VIEW_SET_CURRENT_LANGUAGE; payload: string }
  | { type: typeof APP_VIEW_SET_LANGUAGES; payload: string[] };

export const appViewSetTheme = (isLightTheme: boolean): AppViewAction => ({
  type: APP_VIEW_SET_THEME,
  payload: isLightTheme,
});

export const appViewSetCurrentLanguage = (language: string): AppViewAction => ({
  type: APP_VIEW_SET_CURRENT_LANGUAGE,
  payload: language,
});

export const appViewSetLanguages = (languages: string[]): AppViewAction => ({
  type: APP_VIEW_SET_LANGUAGES,
  payload: languages,
});
