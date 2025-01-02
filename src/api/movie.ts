import { MovieCredits, Genre, MovieDetails, MovieWithGenres } from 'src/types';
import { FETCH_OPTIONS, MOVIE_CATEGORIES } from 'src/utils/constants';
import { getLanguageFromParams } from 'src/utils/getLanguageFromParams';
import {
  isMovieCredits,
  isGenresResponse,
  isMovieDetails,
  isMovieResponse,
} from 'src/utils/guards';

type MoviesWithMaxPages = {
  movies: MovieWithGenres[];
  maxPages: number;
};

export const getMovies = async (
  category: (typeof MOVIE_CATEGORIES)[number],
  page: number
): Promise<MoviesWithMaxPages> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${category}?language=${getLanguageFromParams()}&page=${page}`,
    {
      ...FETCH_OPTIONS,
      method: 'GET',
    }
  );

  const movieResponse: unknown = await response.json();

  return isMovieResponse(movieResponse)
    ? { movies: movieResponse.results, maxPages: movieResponse.total_pages }
    : { movies: [], maxPages: 1 };
};

export const getSearchedMovies = async (
  query: string,
  page: number
): Promise<MoviesWithMaxPages> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&language=${getLanguageFromParams()}&page=${page}`,
    {
      ...FETCH_OPTIONS,
      method: 'GET',
    }
  );

  const movieResponse: unknown = await response.json();

  return isMovieResponse(movieResponse)
    ? { movies: movieResponse.results, maxPages: movieResponse.total_pages }
    : { movies: [], maxPages: 1 };
};

export const getGenres = async (): Promise<Genre[]> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?language=${getLanguageFromParams()}`,
    {
      ...FETCH_OPTIONS,
      method: 'GET',
    }
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
    ...FETCH_OPTIONS,
    method: 'POST',
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
    ...FETCH_OPTIONS,
    method: 'POST',
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
  shouldGetFavouriteList: boolean
): Promise<MovieWithGenres[]> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/account/${accountId}/${
      shouldGetFavouriteList ? 'favorite' : 'watchlist'
    }/movies?language=${getLanguageFromParams()}&page=1&sort_by=created_at.asc`,
    {
      ...FETCH_OPTIONS,
      method: 'GET',
    }
  );

  const movieResponse: unknown = await response.json();

  return isMovieResponse(movieResponse) ? movieResponse.results : [];
};

export const getMovie = async (movieId: number): Promise<MovieDetails | null> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=${getLanguageFromParams()}`,
    {
      ...FETCH_OPTIONS,
      method: 'GET',
    }
  );

  const movieResponse: unknown = await response.json();

  return isMovieDetails(movieResponse) ? movieResponse : null;
};

export const getCredits = async (movieId: number): Promise<MovieCredits | null> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=${getLanguageFromParams()}`,
    {
      ...FETCH_OPTIONS,
      method: 'GET',
    }
  );

  const creditsResponse: unknown = await response.json();

  return isMovieCredits(creditsResponse) ? creditsResponse : null;
};
