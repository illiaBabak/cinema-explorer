import { Genre, MovieType } from 'src/types';
import { MOVIE_CATEGORIES } from 'src/utils/constants';
import { isGenresResponse, isMovieResponse } from 'src/utils/guards';

const GET_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_TMDB_API_KEY,
  },
};

type Result = {
  movies: MovieType[];
  maxPages: number;
};

export const getMovies = async (
  category: (typeof MOVIE_CATEGORIES)[number],
  page: number
): Promise<Result> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
    GET_OPTIONS
  );

  const movieResponse: unknown = await response.json();

  return isMovieResponse(movieResponse)
    ? { movies: movieResponse.results, maxPages: movieResponse.total_pages }
    : { movies: [], maxPages: 1 };
};

export const getSearchedMovies = async (query: string): Promise<MovieType[]> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
    GET_OPTIONS
  );

  const movieResponse: unknown = await response.json();

  return isMovieResponse(movieResponse) ? movieResponse.results : [];
};

export const getGenres = async (): Promise<Genre[]> => {
  const response = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?language=en',
    GET_OPTIONS
  );

  const genresResponse: unknown = await response.json();

  return isGenresResponse(genresResponse) ? genresResponse.genres : [];
};

export const addOrDeleteFavorite = async (
  mediaId: number,
  shouldAdd: boolean,
  accountId: number
): Promise<void> => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: import.meta.env.VITE_TMDB_API_KEY,
    },
    body: JSON.stringify({ media_type: 'movie', media_id: mediaId, favorite: shouldAdd }),
  };

  const request = await fetch(
    `https://api.themoviedb.org/3/account/${accountId}/favorite`,
    options
  );

  if (!request) throw new Error('Something went wrong with add/delete favourite item');
};

export const addOrDeleteToWatchlist = async (
  mediaId: number,
  shouldAdd: boolean,
  accountID: number
): Promise<void> => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: import.meta.env.VITE_TMDB_API_KEY,
    },
    body: JSON.stringify({ media_type: 'movie', media_id: mediaId, watchlist: shouldAdd }),
  };

  const request = await fetch(
    `https://api.themoviedb.org/3/account/${accountID}/watchlist`,
    options
  );

  if (!request) throw new Error('Something went wrong with add/delete to watchlist');
};

export const getFavouriteOrWatchlistMovies = async (
  accountId: number,
  shouldGetFavourite: boolean
): Promise<MovieType[]> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/account/${accountId}/${
      shouldGetFavourite ? 'favorite' : 'watchlist'
    }/movies?language=en-US&page=1&sort_by=created_at.asc`,
    GET_OPTIONS
  );

  const movieResponse: unknown = await response.json();

  return isMovieResponse(movieResponse) ? movieResponse.results : [];
};
