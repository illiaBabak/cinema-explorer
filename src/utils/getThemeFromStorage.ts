import { isBoolean } from './guards';

export const getThemeFromStorage = (): boolean => {
  const localStorageData = localStorage.getItem('is_light_theme_cinema') ?? '';
  const parsedLightThemeData: unknown = localStorageData ? JSON.parse(localStorageData) : null;

  return isBoolean(parsedLightThemeData) ? parsedLightThemeData : true;
};
