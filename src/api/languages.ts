import { isStringArr } from 'src/utils/guards';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_TMDB_API_KEY,
  },
};

export const getLanguages = async (): Promise<string[]> => {
  const response = await fetch(
    'https://api.themoviedb.org/3/configuration/primary_translations',
    options
  );

  const parsedLanguages: unknown = await response.json();

  return isStringArr(parsedLanguages) ? parsedLanguages : [];
};
