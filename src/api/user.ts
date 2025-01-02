import { User } from 'src/types';
import { FETCH_OPTIONS } from 'src/utils/constants';
import { isUser } from 'src/utils/guards';

export const getUser = async (sessionId: string): Promise<User | null> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/account/account_id?session_id=${sessionId}`,
    {
      method: 'GET',
      ...FETCH_OPTIONS,
    }
  );

  const userData: unknown = await response.json();
  const parsedUser = isUser(userData) ? userData : null;

  return parsedUser;
};
