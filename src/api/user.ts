import { User } from 'src/types';
import { isUser } from 'src/utils/guards';

export const getUser = async (sessionId: string): Promise<User | null> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: import.meta.env.VITE_TMDB_API_KEY,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/account/account_id?session_id=${sessionId}`,
    options
  );

  const userData: unknown = await response.json();
  const parsedUser = isUser(userData) ? userData : null;

  return parsedUser;
};
