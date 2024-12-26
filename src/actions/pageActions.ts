export const PAGE_SET_THEME = 'page_set_is_light_theme';

export const PAGE_SET_CURRENT_LANGUAGE = 'page_set_language';

export const PAGE_SET_LANGUAGES = 'page_set_languages';

export type PageAction =
  | { type: typeof PAGE_SET_THEME; payload: boolean }
  | { type: typeof PAGE_SET_CURRENT_LANGUAGE; payload: string }
  | { type: typeof PAGE_SET_LANGUAGES; payload: string[] };

export const pageSetIsLightTheme = (isLightTheme: boolean): PageAction => ({
  type: PAGE_SET_THEME,
  payload: isLightTheme,
});

export const pageSetCurrentLanguage = (language: string): PageAction => ({
  type: PAGE_SET_CURRENT_LANGUAGE,
  payload: language,
});

export const pageSetLanguages = (languages: string[]): PageAction => ({
  type: PAGE_SET_LANGUAGES,
  payload: languages,
});
