import { isSessionResponse, isTokenResponse } from 'src/utils/guards';

const getToken = async (): Promise<string | null> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: import.meta.env.VITE_TMDB_API_KEY,
    },
  };

  const tokenResponse = await fetch(
    'https://api.themoviedb.org/3/authentication/token/new',
    options
  );

  const tokenData: unknown = await tokenResponse.json();

  return isTokenResponse(tokenData) ? tokenData.request_token : null;
};

const validateToken = async (username: string, password: string): Promise<string | null> => {
  const token = await getToken();

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: import.meta.env.VITE_TMDB_API_KEY,
    },
    body: JSON.stringify({
      username,
      password,
      request_token: token,
    }),
  };

  const response = await fetch(
    'https://api.themoviedb.org/3/authentication/token/validate_with_login',
    options
  );

  const validatedToken: unknown = await response.json();

  return isTokenResponse(validatedToken) ? validatedToken.request_token : null;
};

export const getSessionId = async (username: string, password: string): Promise<string | null> => {
  const validatedToken = await validateToken(username, password);

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: import.meta.env.VITE_TMDB_API_KEY,
    },
    body: JSON.stringify({ request_token: validatedToken }),
  };

  const response = await fetch('https://api.themoviedb.org/3/authentication/session/new', options);

  const sessionData: unknown = await response.json();

  return isSessionResponse(sessionData) ? sessionData.session_id : null;
};
