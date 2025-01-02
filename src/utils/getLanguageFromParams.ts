import { isoMapping } from './constants';
import { getKeyByValue } from './getKeyByValue';

export const getLanguageFromParams = (): string => {
  const params = new URLSearchParams(window.location.search);

  const language = params.get('language');

  if (language) return language;

  const userLanguage =
    Object.values(isoMapping).find((val) => val === navigator.language.toLocaleUpperCase()) ?? '';

  return getKeyByValue(isoMapping, userLanguage) ?? 'en-US';
};
