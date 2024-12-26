import { isoMapping } from './constants';

export const getLanguageFromParams = (): string => {
  const params = new URLSearchParams(window.location.search);

  const language = params.get('language');

  return language
    ? language
    : Object.entries(isoMapping).find(
        ([, val]) => val === navigator.language.toLocaleUpperCase()
      )?.[0] ?? '';
};
