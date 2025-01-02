import { Person } from 'src/types';
import { FETCH_OPTIONS } from 'src/utils/constants';
import { getLanguageFromParams } from 'src/utils/getLanguageFromParams';
import { isPerson } from 'src/utils/guards';

export const getPerson = async (personId: number): Promise<Person | null> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${personId}?language=${getLanguageFromParams()}`,
    {
      method: 'GET',
      ...FETCH_OPTIONS,
    }
  );

  const personData: unknown = await response.json();

  return isPerson(personData) ? personData : null;
};
