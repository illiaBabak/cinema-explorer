import {
  CastMember,
  MovieCredits,
  Genre,
  GenresResponse,
  MovieDetails,
  MovieWithGenres,
  MovieResponse,
  MovieBaseType,
  Person,
  SessionResponse,
  TokenResponse,
  User,
  ValidateErrorResponse,
} from 'src/types';

export const isNumber = (data: unknown): data is number => typeof data === 'number';

export const isString = (data: unknown): data is string => typeof data === 'string';

export const isObj = (data: unknown): data is object => !!data && typeof data === 'object';

export const isBoolean = (data: unknown): data is boolean => typeof data === 'boolean';

export const isNull = (data: unknown): data is null => !data && typeof data === 'object';

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
  'id' in data &&
  isNumber(data.id) &&
  isObj(data.avatar.gravatar) &&
  'hash' in data.avatar.gravatar &&
  isString(data.avatar.gravatar.hash) &&
  'tmdb' in data.avatar &&
  isObj(data.avatar.tmdb) &&
  'avatar_path' in data.avatar.tmdb &&
  (isString(data.avatar.tmdb.avatar_path) || !data.avatar.tmdb.avatar_path) &&
  'username' in data &&
  isString(data.username);

export const isGenresObj = (data: unknown): data is { id: number; name: string } =>
  isObj(data) && 'id' in data && 'name' in data && isNumber(data.id) && isString(data.name);

export const isMovie = (data: unknown): data is MovieBaseType =>
  isObj(data) &&
  'poster_path' in data &&
  'original_title' in data &&
  'id' in data &&
  'overview' in data &&
  'backdrop_path' in data &&
  'release_date' in data &&
  'title' in data &&
  isString(data.title) &&
  (isString(data.poster_path) || !data.poster_path) &&
  isString(data.original_title) &&
  (isNull(data.backdrop_path) || isString(data.backdrop_path)) &&
  isString(data.overview) &&
  isString(data.release_date);

export const isMovieWithGenres = (data: unknown): data is MovieWithGenres =>
  isMovie(data) &&
  'genre_ids' in data &&
  Array.isArray(data.genre_ids) &&
  data.genre_ids.every((el) => isNumber(el));

export const isMovieDetails = (data: unknown): data is MovieDetails =>
  isMovie(data) &&
  'runtime' in data &&
  isNumber(data.runtime) &&
  'status' in data &&
  isString(data.status);

export const isMovieResponse = (data: unknown): data is MovieResponse =>
  isObj(data) &&
  'results' in data &&
  'total_pages' in data &&
  Array.isArray(data.results) &&
  data.results.every((el) => isMovieWithGenres(el)) &&
  isNumber(data.total_pages);

export const isGenre = (data: unknown): data is Genre =>
  isObj(data) && 'id' in data && 'name' in data && isNumber(data.id) && isString(data.name);

export const isGenresResponse = (data: unknown): data is GenresResponse =>
  isObj(data) &&
  'genres' in data &&
  Array.isArray(data.genres) &&
  data.genres.every((el) => isGenre(el));

export const isCastMember = (data: unknown): data is CastMember =>
  isObj(data) &&
  'name' in data &&
  isString(data.name) &&
  'profile_path' in data &&
  (isNull(data.profile_path) || isString(data.profile_path)) &&
  'character' in data &&
  isString(data.character) &&
  'id' in data &&
  isNumber(data.id);

export const isMovieCredits = (data: unknown): data is MovieCredits =>
  isObj(data) &&
  'cast' in data &&
  Array.isArray(data.cast) &&
  data.cast.every((el) => isCastMember(el));

export const isPerson = (data: unknown): data is Person =>
  isObj(data) &&
  'biography' in data &&
  'birthday' in data &&
  'deathday' in data &&
  'name' in data &&
  'place_of_birth' in data &&
  'profile_path' in data &&
  'known_for_department' in data &&
  isString(data.biography) &&
  (isString(data.birthday) || isNull(data.birthday)) &&
  (isString(data.deathday) || isNull(data.deathday)) &&
  isString(data.name) &&
  (isString(data.place_of_birth) || isNull(data.place_of_birth)) &&
  isString(data.profile_path) &&
  isString(data.known_for_department);

export const isStringArr = (data: unknown): data is string[] =>
  Array.isArray(data) && data.every((el) => isString(el));
