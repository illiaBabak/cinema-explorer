import { SessionResponse, TokenResponse, User, ValidateErrorResponse } from 'src/types';

export const isNumber = (data: unknown): data is number => typeof data === 'number';

export const isString = (data: unknown): data is string => typeof data === 'string';

export const isObj = (data: unknown): data is object => !!data && typeof data === 'object';

export const isTokenResponse = (data: unknown): data is TokenResponse =>
  isObj(data) && 'request_token' in data && isString(data.request_token);

export const isErrorValidate = (data: unknown): data is ValidateErrorResponse =>
  isObj(data) && 'status_message' in data && isString(data.status_message);

export const isSessionResponse = (data: unknown): data is SessionResponse =>
  isObj(data) && 'session_id' in data && isString(data.session_id);

export const isUser = (data: unknown): data is User =>
  isObj(data) &&
  'avatar' in data &&
  isObj(data.avatar) &&
  'gravatar' in data.avatar &&
  isObj(data.avatar.gravatar) &&
  'hash' in data.avatar.gravatar &&
  isString(data.avatar.gravatar.hash) &&
  'tmdb' in data.avatar &&
  isObj(data.avatar.tmdb) &&
  'avatar_path' in data.avatar.tmdb &&
  (isString(data.avatar.tmdb.avatar_path) || !!data) &&
  'username' in data &&
  isString(data.username);
