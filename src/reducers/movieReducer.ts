import {
  MOVIE_SET_CURRENT_CATEGORY,
  MOVIE_SET_GENRES,
  MOVIE_SET_IS_LOADING,
  MOVIE_SET_POPULAR_LIST,
  MOVIE_SET_TOP_RATED_LIST,
  MOVIE_SET_UPCOMING_LIST,
  MovieAction,
} from 'src/actions/movieActions';
import { MovieType } from 'src/types';
import { MOVIE_CATEGORIES } from 'src/utils/constants';

export type MovieInitialStateType = {
  popularMovies: {
    movies: MovieType[];
    page: number;
    maxPages: number;
  };
  upComingMovies: {
    movies: MovieType[];
    page: number;
    maxPages: number;
  };
  topRatedMovies: {
    movies: MovieType[];
    page: number;
    maxPages: number;
  };
  currentCategory: (typeof MOVIE_CATEGORIES)[number];
  isLoading: boolean;
  genres: {
    [k: string]: string;
  };
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
  currentCategory: 'upcoming',
  isLoading: false,
  genres: {},
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

    default:
      return state;
  }
};
