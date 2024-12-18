import { Person } from 'src/types';
import { isPerson } from 'src/utils/guards';

export const getPerson = async (personId: number): Promise<Person | null> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: import.meta.env.VITE_TMDB_API_KEY,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/person/${personId}?language=en-US`,
    options
  );

  const personData: unknown = await response.json();

  return isPerson(personData) ? personData : null;
};
