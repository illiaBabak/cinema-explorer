import {
  MOVIE_SET_CREDITS,
  MOVIE_SET_CURRENT_CATEGORY,
  MOVIE_SET_FAVOURITE_LIST,
  MOVIE_SET_FULL_INFO,
  MOVIE_SET_GENRES,
  MOVIE_SET_IS_LOADING,
  MOVIE_SET_POPULAR_LIST,
  MOVIE_SET_QUERY,
  MOVIE_SET_SEARCHED_LIST,
  MOVIE_SET_TOP_RATED_LIST,
  MOVIE_SET_UPCOMING_LIST,
  MOVIE_SET_WATCHLIST_LIST,
  MovieAction,
} from 'src/actions/movieActions';
import { MovieCredits, MovieDetails, MoviePageData, MovieWithGenres } from 'src/types';
import { MOVIE_CATEGORIES } from 'src/utils/constants';

export type MovieInitialStateType = {
  popularMovies: MoviePageData;
  upComingMovies: MoviePageData;
  topRatedMovies: MoviePageData;
  searchedMovies: MoviePageData;
  query: string;
  currentCategory: (typeof MOVIE_CATEGORIES)[number];
  isLoading: boolean;
  genres: {
    [k: string]: string;
  };
  favouriteMovies: (MovieWithGenres | MovieDetails | null)[];
  watchlistMovies: (MovieWithGenres | MovieDetails | null)[];
  movieFullInfo: MovieDetails | null;
  credits: MovieCredits | null;
};

export const movieInitialState: MovieInitialStateType = {
  popularMovies: {
    movies: [],
    page: 1,
    maxPages: 1,
  },

  upComingMovies: {
    movies: [],
    page: 1,
    maxPages: 1,
  },
  topRatedMovies: {
    movies: [],
    page: 1,
    maxPages: 1,
  },
  searchedMovies: {
    movies: [],
    page: 1,
    maxPages: 1,
  },
  query: new URLSearchParams(window.location.search).get('query') ?? '',
  currentCategory: 'upcoming',
  isLoading: false,
  genres: {},
  favouriteMovies: [],
  watchlistMovies: [],
  movieFullInfo: null,
  credits: null,
};

export const movieReducer = (
  state = movieInitialState,
  action: MovieAction
): MovieInitialStateType => {
  switch (action.type) {
    case MOVIE_SET_POPULAR_LIST: {
      return {
        ...state,
        popularMovies: {
          movies: action.payload.movies,
          page: action.payload.page,
          maxPages: action.payload.maxPages,
        },
      };
    }

    case MOVIE_SET_TOP_RATED_LIST: {
      return {
        ...state,
        topRatedMovies: {
          movies: action.payload.movies,
          page: action.payload.page,
          maxPages: action.payload.maxPages,
        },
      };
    }

    case MOVIE_SET_UPCOMING_LIST: {
      return {
        ...state,
        upComingMovies: {
          movies: action.payload.movies,
          page: action.payload.page,
          maxPages: action.payload.maxPages,
        },
      };
    }

    case MOVIE_SET_SEARCHED_LIST: {
      return {
        ...state,
        searchedMovies: {
          movies: action.payload.movies,
          page: action.payload.page,
          maxPages: action.payload.maxPages,
        },
      };
    }

    case MOVIE_SET_QUERY: {
      return {
        ...state,
        query: action.payload,
      };
    }

    case MOVIE_SET_CURRENT_CATEGORY: {
      return {
        ...state,
        currentCategory: action.payload,
      };
    }

    case MOVIE_SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case MOVIE_SET_GENRES: {
      return {
        ...state,
        genres: Object.fromEntries(action.payload.map((genre) => [genre.id, genre.name])),
      };
    }

    case MOVIE_SET_FAVOURITE_LIST: {
      return {
        ...state,
        favouriteMovies: action.payload,
      };
    }

    case MOVIE_SET_WATCHLIST_LIST: {
      return {
        ...state,
        watchlistMovies: action.payload,
      };
    }

    case MOVIE_SET_FULL_INFO: {
      return {
        ...state,
        movieFullInfo: action.payload,
      };
    }

    case MOVIE_SET_CREDITS: {
      return {
        ...state,
        credits: action.payload,
      };
    }

    default:
      return state;
  }
};
