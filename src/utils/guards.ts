import { SessionResponse, TokenResponse, ValidateErrorResponse } from 'src/types';

export const isNumber = (data: unknown): data is number => typeof data === 'number';

export const isString = (data: unknown): data is string => typeof data === 'string';

export const isObj = (data: unknown): data is object => !!data && typeof data === 'object';

export const isTokenResponse = (data: unknown): data is TokenResponse =>
  isObj(data) && 'request_token' in data && isString(data.request_token);

export const isErrorValidate = (data: unknown): data is ValidateErrorResponse =>
  isObj(data) && 'status_message' in data && isString(data.status_message);

export const isSessionResponse = (data: unknown): data is SessionResponse =>
  isObj(data) && 'session_id' in data && isString(data.session_id);
