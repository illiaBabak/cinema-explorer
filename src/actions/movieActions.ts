import { Genre, MovieType } from 'src/types';
import { MOVIE_CATEGORIES } from 'src/utils/constants';

export const MOVIE_SET_POPULAR_LIST = 'movie_set_popular_list';

export const MOVIE_SET_TOP_RATED_LIST = 'movie_set_top_rated_list';

export const MOVIE_SET_UPCOMING_LIST = 'movie_set_upcoming_list';

export const MOVIE_SET_SEARCHED_LIST = 'movie_set_searched_list';

export const MOVIE_SET_QUERY = 'movie_set_query';

export const MOVIE_SET_CURRENT_CATEGORY = 'movie_set_current_category';

export const MOVIE_SET_IS_LOADING = 'movie_set_is_loading';

export const MOVIE_SET_GENRES = 'movie_set_genres';

export const MOVIE_SET_FAVOURITE = 'movie_set_favourite';

export const MOVIE_SET_WATCHLIST = 'movie_set_watchlist';

export const MOVIE_SET_SHOULD_SHOW_MENU = 'movie_set_should_show_menu';

export const MOVIE_SET_MENU_COORDS = 'movie_set_menu_coords';

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
    }
  | {
      type: typeof MOVIE_SET_SEARCHED_LIST;
      payload: {
        movies: MovieType[];
      };
    }
  | {
      type: typeof MOVIE_SET_QUERY;
      payload: string;
    }
  | {
      type: typeof MOVIE_SET_FAVOURITE;
      payload: MovieType[];
    }
  | {
      type: typeof MOVIE_SET_WATCHLIST;
      payload: MovieType[];
    }
  | {
      type: typeof MOVIE_SET_SHOULD_SHOW_MENU;
      payload: number;
    }
  | {
      type: typeof MOVIE_SET_MENU_COORDS;
      payload: number;
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

export const movieSetSearchedList = ({ movies }: { movies: MovieType[] }): MovieAction => ({
  type: MOVIE_SET_SEARCHED_LIST,
  payload: {
    movies,
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

export const movieSetFavourite = (movies: MovieType[]): MovieAction => ({
  type: MOVIE_SET_FAVOURITE,
  payload: movies,
});

export const movieSetWatchlist = (movies: MovieType[]): MovieAction => ({
  type: MOVIE_SET_WATCHLIST,
  payload: movies,
});

export const movieSetShouldShowMenu = (movieId: number): MovieAction => ({
  type: MOVIE_SET_SHOULD_SHOW_MENU,
  payload: movieId,
});

export const movieSetMenuCoords = (rightCoords: number): MovieAction => ({
  type: MOVIE_SET_MENU_COORDS,
  payload: rightCoords,
});
