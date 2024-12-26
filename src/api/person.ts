import { Person } from 'src/types';
import { getLanguageFromParams } from 'src/utils/getLanguageFromParams';
import { isPerson } from 'src/utils/guards';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_TMDB_API_KEY,
  },
};

export const getPerson = async (personId: number): Promise<Person | null> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${personId}?language=${getLanguageFromParams()}`,
    options
  );

  const personData: unknown = await response.json();

  return isPerson(personData) ? personData : null;
};
