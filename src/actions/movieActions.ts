import { Genre, MovieType } from 'src/types';
import { MOVIE_CATEGORIES } from 'src/utils/constants';

export const MOVIE_SET_POPULAR_LIST = 'movie_set_popular_list';

export const MOVIE_SET_TOP_RATED_LIST = 'movie_set_top_rated_list';

export const MOVIE_SET_UPCOMING_LIST = 'movie_set_upcoming_list';

export const MOVIE_SET_CURRENT_CATEGORY = 'movie_set_current_category';

export const MOVIE_SET_IS_LOADING = 'movie_set_is_loading';

export const MOVIE_SET_GENRES = 'movie_set_genres';

export type MovieAction =
  | { type: typeof MOVIE_SET_GENRES; payload: Genre[] }
  | { type: typeof MOVIE_SET_IS_LOADING; payload: boolean }
  | { type: typeof MOVIE_SET_CURRENT_CATEGORY; payload: (typeof MOVIE_CATEGORIES)[number] }
  | {
      type: typeof MOVIE_SET_TOP_RATED_LIST;
      payload: {
        movies: MovieType[];
        page: number;
        maxPages: number;
      };
    }
  | {
      type: typeof MOVIE_SET_POPULAR_LIST;
      payload: {
        movies: MovieType[];
        page: number;
        maxPages: number;
      };
    }
  | {
      type: typeof MOVIE_SET_UPCOMING_LIST;
      payload: {
        movies: MovieType[];
        page: number;
        maxPages: number;
      };
    };

export const movieSetPopularList = ({
  movies,
  page,
  maxPages,
}: {
  movies: MovieType[];
  page: number;
  maxPages: number;
}): MovieAction => ({
  type: MOVIE_SET_POPULAR_LIST,
  payload: {
    movies,
    page,
    maxPages,
  },
});

export const movieSetTopRatedList = ({
  movies,
  page,
  maxPages,
}: {
  movies: MovieType[];
  page: number;
  maxPages: number;
}): MovieAction => ({
  type: MOVIE_SET_TOP_RATED_LIST,
  payload: {
    movies,
    page,
    maxPages,
  },
});

export const movieSetUpComingList = ({
  movies,
  page,
  maxPages,
}: {
  movies: MovieType[];
  page: number;
  maxPages: number;
}): MovieAction => ({
  type: MOVIE_SET_UPCOMING_LIST,
  payload: {
    movies,
    page,
    maxPages,
  },
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
