import { Credits, Genre, MovieDetails, MovieIncomplete } from 'src/types';
import { MOVIE_CATEGORIES } from 'src/utils/constants';
import { isCredits, isGenresResponse, isMovieDetails, isMovieResponse } from 'src/utils/guards';

const GET_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_TMDB_API_KEY,
  },
};

type Result = {
  movies: MovieIncomplete[];
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

export const getSearchedMovies = async (query: string, page: number): Promise<Result> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=${page}`,
    GET_OPTIONS
  );

  const movieResponse: unknown = await response.json();

  return isMovieResponse(movieResponse)
    ? { movies: movieResponse.results, maxPages: movieResponse.total_pages }
    : { movies: [], maxPages: 1 };
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
): Promise<MovieIncomplete[]> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/account/${accountId}/${
      shouldGetFavourite ? 'favorite' : 'watchlist'
    }/movies?language=en-US&page=1&sort_by=created_at.asc`,
    GET_OPTIONS
  );

  const movieResponse: unknown = await response.json();

  return isMovieResponse(movieResponse) ? movieResponse.results : [];
};

export const getMovie = async (movieId: number): Promise<MovieDetails | null> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    GET_OPTIONS
  );

  const movieResponse: unknown = await response.json();

  return isMovieDetails(movieResponse) ? movieResponse : null;
};

export const getCredits = async (movieId: number): Promise<Credits | null> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    GET_OPTIONS
  );

  const creditsResponse: unknown = await response.json();

  return isCredits(creditsResponse) ? creditsResponse : null;
};
