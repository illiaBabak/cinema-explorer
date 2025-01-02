import { FETCH_OPTIONS } from 'src/utils/constants';
import { isErrorValidate, isSessionResponse, isTokenResponse } from 'src/utils/guards';

type LoginResponse = {
  data: string | null;
  error?: string;
};

const getToken = async (): Promise<string | null> => {
  const tokenResponse = await fetch('https://api.themoviedb.org/3/authentication/token/new', {
    ...FETCH_OPTIONS,
    method: 'GET',
  });

  const tokenData: unknown = await tokenResponse.json();

  return isTokenResponse(tokenData) ? tokenData.request_token : null;
};

const validateToken = async (username: string, password: string): Promise<LoginResponse> => {
  const token = await getToken();

  const options = {
    ...FETCH_OPTIONS,
    method: 'POST',
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

  const validatedData: unknown = await response.json();

  if (isErrorValidate(validatedData))
    return { data: validatedData.request_token, error: validatedData.status_message };
  else if (isTokenResponse(validatedData)) return { data: validatedData.request_token };

  return { data: null };
};

export const getSessionId = async (username: string, password: string): Promise<LoginResponse> => {
  const { data: validatedToken, error } = await validateToken(username, password);

  const options = {
    ...FETCH_OPTIONS,
    method: 'POST',
    body: JSON.stringify({ request_token: validatedToken }),
  };

  const response = await fetch('https://api.themoviedb.org/3/authentication/session/new', options);

  const sessionData: unknown = await response.json();

  return isSessionResponse(sessionData) ? { data: sessionData.session_id } : { data: null, error };
};

export const deleteSessionId = async (sessionId: string): Promise<void> => {
  const options = {
    ...FETCH_OPTIONS,
    method: 'DELETE',
    body: JSON.stringify({ session_id: sessionId }),
  };

  const response = await fetch('https://api.themoviedb.org/3/authentication/session', options);

  if (!response) throw new Error('Failed to delete session id using tmdb');
};
