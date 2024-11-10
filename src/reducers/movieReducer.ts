import {
  MOVIE_SET_CURRENT_CATEGORY,
  MOVIE_SET_GENRES,
  MOVIE_SET_IS_LOADING,
  MOVIE_SET_POPULAR_LIST,
  MOVIE_SET_TOP_RATED_LIST,
  MOVIE_SET_UPCOMING_LIST,
  MovieAction,
} from 'src/actions/movieActions';
import { Genre, MovieType } from 'src/types';
import { MOVIE_CATEGORIES } from 'src/utils/constants';

export type MovieInitialStateType = {
  popularMovies: MovieType[];
  upComingMovies: MovieType[];
  topRatedMovies: MovieType[];
  currentCategory: (typeof MOVIE_CATEGORIES)[number];
  isLoading: boolean;
  genres: Genre[];
};

export const movieInitialState: MovieInitialStateType = {
  popularMovies: [],
  upComingMovies: [],
  topRatedMovies: [],
  currentCategory: 'upcoming',
  isLoading: false,
  genres: [],
};

export const movieReducer = (
  state = movieInitialState,
  action: MovieAction
): MovieInitialStateType => {
  switch (action.type) {
    case MOVIE_SET_POPULAR_LIST: {
      return {
        ...state,
        popularMovies: action.payload,
      };
    }

    case MOVIE_SET_TOP_RATED_LIST: {
      return {
        ...state,
        topRatedMovies: action.payload,
      };
    }

    case MOVIE_SET_UPCOMING_LIST: {
      return {
        ...state,
        upComingMovies: action.payload,
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
        genres: action.payload,
      };
    }

    default:
      return state;
  }
};
