import { MovieCredits, Genre, MovieDetails, MovieWithGenres, MoviePageData } from 'src/types';
import { MOVIE_CATEGORIES } from 'src/utils/constants';

export const MOVIE_SET_POPULAR_LIST = 'movie_set_popular_list';

export const MOVIE_SET_TOP_RATED_LIST = 'movie_set_top_rated_list';

export const MOVIE_SET_UPCOMING_LIST = 'movie_set_upcoming_list';

export const MOVIE_SET_SEARCHED_LIST = 'movie_set_searched_list';

export const MOVIE_SET_QUERY = 'movie_set_query';

export const MOVIE_SET_CURRENT_CATEGORY = 'movie_set_current_category';

export const MOVIE_SET_IS_LOADING = 'movie_set_is_loading';

export const MOVIE_SET_GENRES = 'movie_set_genres';

export const MOVIE_SET_FAVOURITE_LIST = 'movie_set_favourite_list';

export const MOVIE_SET_WATCHLIST_LIST = 'movie_set_watchlist_list';

export const MOVIE_SET_FULL_INFO = 'movie_set_full_info';

export const MOVIE_SET_CREDITS = 'movie_set_credits';

export type MovieAction =
  | { type: typeof MOVIE_SET_GENRES; payload: Genre[] }
  | { type: typeof MOVIE_SET_IS_LOADING; payload: boolean }
  | { type: typeof MOVIE_SET_CURRENT_CATEGORY; payload: (typeof MOVIE_CATEGORIES)[number] }
  | {
      type: typeof MOVIE_SET_TOP_RATED_LIST;
      payload: MoviePageData;
    }
  | {
      type: typeof MOVIE_SET_POPULAR_LIST;
      payload: MoviePageData;
    }
  | {
      type: typeof MOVIE_SET_UPCOMING_LIST;
      payload: MoviePageData;
    }
  | {
      type: typeof MOVIE_SET_SEARCHED_LIST;
      payload: MoviePageData;
    }
  | {
      type: typeof MOVIE_SET_QUERY;
      payload: string;
    }
  | {
      type: typeof MOVIE_SET_FAVOURITE_LIST;
      payload: (MovieWithGenres | MovieDetails | null)[];
    }
  | {
      type: typeof MOVIE_SET_WATCHLIST_LIST;
      payload: (MovieWithGenres | MovieDetails | null)[];
    }
  | {
      type: typeof MOVIE_SET_FULL_INFO;
      payload: MovieDetails | null;
    }
  | {
      type: typeof MOVIE_SET_CREDITS;
      payload: MovieCredits | null;
    };

export const movieSetPopularList = ({ movies, page, maxPages }: MoviePageData): MovieAction => ({
  type: MOVIE_SET_POPULAR_LIST,
  payload: {
    movies,
    page,
    maxPages,
  },
});

export const movieSetTopRatedList = ({ movies, page, maxPages }: MoviePageData): MovieAction => ({
  type: MOVIE_SET_TOP_RATED_LIST,
  payload: {
    movies,
    page,
    maxPages,
  },
});

export const movieSetUpComingList = ({ movies, page, maxPages }: MoviePageData): MovieAction => ({
  type: MOVIE_SET_UPCOMING_LIST,
  payload: {
    movies,
    page,
    maxPages,
  },
});

export const movieSetSearchedList = ({ movies, page, maxPages }: MoviePageData): MovieAction => ({
  type: MOVIE_SET_SEARCHED_LIST,
  payload: {
    movies,
    page,
    maxPages,
  },
});

export const movieSetQuery = (query: string): MovieAction => ({
  type: MOVIE_SET_QUERY,
  payload: query,
});

export const movieSetCurrentCategory = (
  category: (typeof MOVIE_CATEGORIES)[number]
): MovieAction => ({
  type: MOVIE_SET_CURRENT_CATEGORY,
  payload: category,
});

export const movieSetIsLoading = (isLoading: boolean): MovieAction => ({
  type: MOVIE_SET_IS_LOADING,
  payload: isLoading,
});

export const movieSetGenres = (genres: Genre[]): MovieAction => ({
  type: MOVIE_SET_GENRES,
  payload: genres,
});

export const movieSetFavouriteList = (
  movies: (MovieWithGenres | MovieDetails | null)[]
): MovieAction => ({
  type: MOVIE_SET_FAVOURITE_LIST,
  payload: movies,
});

export const movieSetWatchlistList = (
  movies: (MovieWithGenres | MovieDetails | null)[]
): MovieAction => ({
  type: MOVIE_SET_WATCHLIST_LIST,
  payload: movies,
});

export const movieSetFullInfo = (movieInfo: MovieDetails | null): MovieAction => ({
  type: MOVIE_SET_FULL_INFO,
  payload: movieInfo,
});

export const movieSetCredits = (credits: MovieCredits | null): MovieAction => ({
  type: MOVIE_SET_CREDITS,
  payload: credits,
});
