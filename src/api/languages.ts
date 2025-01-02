import { FETCH_OPTIONS } from 'src/utils/constants';
import { isStringArr } from 'src/utils/guards';

export const getLanguages = async (): Promise<string[]> => {
  const response = await fetch('https://api.themoviedb.org/3/configuration/primary_translations', {
    ...FETCH_OPTIONS,
    method: 'GET',
  });

  const parsedLanguages: unknown = await response.json();

  return isStringArr(parsedLanguages) ? parsedLanguages : [];
};
