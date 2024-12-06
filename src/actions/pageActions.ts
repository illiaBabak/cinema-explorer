export const PAGE_SET_THEME = 'page_set_is_light_theme';

export type PageAction = { type: typeof PAGE_SET_THEME; payload: boolean };

export const pageSetIsLightTheme = (isLightTheme: boolean): PageAction => ({
  type: PAGE_SET_THEME,
  payload: isLightTheme,
});
