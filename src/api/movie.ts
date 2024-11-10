import { Genre, MovieType } from 'src/types';
import { MOVIE_CATEGORIES } from 'src/utils/constants';
import { isGenresResponse, isMovieResponse } from 'src/utils/guards';

const OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_TMDB_API_KEY,
  },
};

export const getMovies = async (
  category: (typeof MOVIE_CATEGORIES)[number]
): Promise<MovieType[]> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
    OPTIONS
  );

  const movieResponse: unknown = await response.json();

  return isMovieResponse(movieResponse) ? movieResponse.results : [];
};

export const getGenres = async (): Promise<Genre[]> => {
  const response = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?language=en',
    OPTIONS
  );

  const genresResponse: unknown = await response.json();

  return isGenresResponse(genresResponse) ? genresResponse.genres : [];
};
