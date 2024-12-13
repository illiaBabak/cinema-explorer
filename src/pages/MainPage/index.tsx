import { Component, createRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import {
  MovieAction,
  movieSetCurrentCategory,
  movieSetFavourite,
  movieSetGenres,
  movieSetIsLoading,
  movieSetPopularList,
  movieSetQuery,
  movieSetSearchedList,
  movieSetTopRatedList,
  movieSetUpComingList,
  movieSetWatchlist,
} from 'src/actions/movieActions';
import {
  getFavouriteOrWatchlistMovies,
  getGenres,
  getMovies,
  getSearchedMovies,
} from 'src/api/movie';
import Header from 'src/components/Header';
import { Loader } from 'src/components/Loader';
import Movie from 'src/components/Movie';
import SideBar from 'src/components/SideBar';
import { MovieInitialStateType } from 'src/reducers/movieReducer';
import { UserInitialStateType } from 'src/reducers/userReducer';
import { Genre, MovieIncomplete } from 'src/types';
import { capitalize } from 'src/utils/capitalize';
import { MOVIE_CATEGORIES, OBSERVER_OPTIONS } from 'src/utils/constants';
import { removeUnderlines } from 'src/utils/removeUnderlines';

type UpdateMoviesProps = {
  movies: MovieIncomplete[];
  page: number;
  maxPages: number;
};
const mapStateToProps = (state: { movie: MovieInitialStateType; user: UserInitialStateType }) => ({
  upComingMovies: state.movie.upComingMovies,
  topRatedMovies: state.movie.topRatedMovies,
  popularMovies: state.movie.popularMovies,
  searchedMovies: state.movie.searchedMovies,
  currentCategory: state.movie.currentCategory,
  isLoadingMovies: state.movie.isLoading,
  query: state.movie.query,
  accountId: state.user.user?.id ?? 0,
});

const mapDispatchToProps = (dispatch: Dispatch<MovieAction>) => ({
  setUpComingMovies: ({ movies, page, maxPages }: UpdateMoviesProps) =>
    dispatch(movieSetUpComingList({ movies, page, maxPages })),
  setTopRatedMovies: ({ movies, page, maxPages }: UpdateMoviesProps) =>
    dispatch(movieSetTopRatedList({ movies, page, maxPages })),
  setPopularMovies: ({ movies, page, maxPages }: UpdateMoviesProps) =>
    dispatch(movieSetPopularList({ movies, page, maxPages })),
  setSearchedMovies: ({
    movies,
    page,
    maxPages,
  }: {
    movies: MovieIncomplete[];
    page: number;
    maxPages: number;
  }) => dispatch(movieSetSearchedList({ movies, page, maxPages })),
  setCurrentCategory: (category: (typeof MOVIE_CATEGORIES)[number]) =>
    dispatch(movieSetCurrentCategory(category)),
  setIsLoadingMovies: (isLoading: boolean) => dispatch(movieSetIsLoading(isLoading)),
  setMovieGenres: (genres: Genre[]) => dispatch(movieSetGenres(genres)),
  setQuery: (query: string) => dispatch(movieSetQuery(query)),
  setFavouriteMovies: (movies: MovieIncomplete[]) => dispatch(movieSetFavourite(movies)),
  setWatchlistMovies: (movies: MovieIncomplete[]) => dispatch(movieSetWatchlist(movies)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class MainPage extends Component<ConnectedProps<typeof connector>> {
  isInitialized = true;
  observer: IntersectionObserver | null = null;
  observerRef = createRef<HTMLDivElement>();

  setMovies = async (category: (typeof MOVIE_CATEGORIES)[number]): Promise<void> => {
    const {
      setIsLoadingMovies,
      upComingMovies,
      setUpComingMovies,
      popularMovies,
      setPopularMovies,
      topRatedMovies,
      setTopRatedMovies,
      accountId,
      setFavouriteMovies,
      setWatchlistMovies,
      searchedMovies,
      setSearchedMovies,
      query,
    } = this.props;

    setIsLoadingMovies(true);

    if (searchedMovies.movies.length && searchedMovies.page <= searchedMovies.maxPages) {
      const { movies, maxPages } = await getSearchedMovies(query, searchedMovies.page);

      setSearchedMovies({
        movies: [...searchedMovies.movies, ...movies],
        page: searchedMovies.page,
        maxPages,
      });
    } else if (category === 'upcoming' && upComingMovies.page <= upComingMovies.maxPages) {
      const { movies, maxPages } = await getMovies(category, upComingMovies.page);

      setUpComingMovies({
        movies: [...upComingMovies.movies, ...movies],
        page: upComingMovies.page,
        maxPages,
      });
    } else if (category === 'popular' && popularMovies.page <= popularMovies.maxPages) {
      const { movies, maxPages } = await getMovies(category, popularMovies.page);

      setPopularMovies({
        movies: [...popularMovies.movies, ...movies],
        page: popularMovies.page,
        maxPages,
      });
    } else if (category === 'top_rated' && topRatedMovies.page <= topRatedMovies.maxPages) {
      const { movies, maxPages } = await getMovies(category, topRatedMovies.page);

      setTopRatedMovies({
        movies: [...topRatedMovies.movies, ...movies],
        page: topRatedMovies.page,
        maxPages,
      });
    }

    const favouriteMovies = await getFavouriteOrWatchlistMovies(accountId, true);
    const watchlistMovies = await getFavouriteOrWatchlistMovies(accountId, false);

    setFavouriteMovies(favouriteMovies);
    setWatchlistMovies(watchlistMovies);

    setIsLoadingMovies(false);
  };

  setGenres = async () => {
    const genres = await getGenres();

    this.props.setMovieGenres(genres);
  };

  updatePage = () => {
    const {
      currentCategory,
      upComingMovies,
      popularMovies,
      topRatedMovies,
      setUpComingMovies,
      setPopularMovies,
      setTopRatedMovies,
      searchedMovies,
      setSearchedMovies,
    } = this.props;

    if (searchedMovies.movies.length) {
      setSearchedMovies({
        movies: [...searchedMovies.movies],
        page: ++searchedMovies.page,
        maxPages: searchedMovies.maxPages,
      });
    } else if (currentCategory === 'upcoming') {
      setUpComingMovies({
        movies: [...upComingMovies.movies],
        page: ++upComingMovies.page,
        maxPages: upComingMovies.maxPages,
      });
    } else if (currentCategory === 'popular') {
      setPopularMovies({
        movies: [...popularMovies.movies],
        page: ++popularMovies.page,
        maxPages: popularMovies.maxPages,
      });
    } else if (currentCategory === 'top_rated') {
      setTopRatedMovies({
        movies: [...topRatedMovies.movies],
        page: ++topRatedMovies.page,
        maxPages: topRatedMovies.maxPages,
      });
    }

    this.setMovies(currentCategory);
  };

  handleObserver = (el: HTMLElement | null) => {
    if (this.observer) this.observer.disconnect();

    this.observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;

      this.updatePage();
    }, OBSERVER_OPTIONS);

    if (el) this.observer.observe(el);
  };

  handleChangeCategory = (category: (typeof MOVIE_CATEGORIES)[number]) => {
    const params = new URLSearchParams(window.location.search);
    params.set('category', category);
    params.delete('query');

    this.props.setCurrentCategory(category);
    this.setMovies(category);
    this.props.setSearchedMovies({
      movies: [],
      page: 1,
      maxPages: 1,
    });
  };

  componentDidMount(): void {
    if (this.observerRef.current && !this.isInitialized)
      setTimeout(() => this.handleObserver(this.observerRef.current), 0);

    if (!this.isInitialized) return;

    const category = new URLSearchParams(window.location.search).get('category') ?? 'upcoming';

    this.isInitialized = false;
    this.setGenres();
    this.handleChangeCategory(category);
  }

  componentWillUnmount(): void {
    if (this.observer) this.observer.disconnect();
  }

  render(): JSX.Element {
    const {
      currentCategory,
      upComingMovies,
      topRatedMovies,
      popularMovies,
      isLoadingMovies,
      searchedMovies,
    } = this.props;

    return (
      <div className='main-page d-flex flex-row justify-content-start w-100 h-100'>
        <SideBar isFullView={true} />
        <div className='d-flex flex-column justify-content-start align-items-center content h-100'>
          <div className='main-content d-flex flex-column justify-content-start align-items-start w-100 h-100 position-relative'>
            <Header />
            <div className='d-flex flex-row categories'>
              {MOVIE_CATEGORIES.map((category, index) => (
                <div
                  className={`category ${
                    category === currentCategory && !searchedMovies.movies.length
                      ? 'selected-category'
                      : ''
                  } text-white d-flex justify-content-center align-items-center m-3 p-1 rounded`}
                  key={`${category}-${index}-category`}
                  onClick={() => {
                    this.handleChangeCategory(category);
                    this.props.setQuery('');
                  }}
                >
                  {removeUnderlines(capitalize(category))}
                </div>
              ))}
            </div>
            <div className='d-flex flex-row w-100 h-100 flex-wrap justify-content-center align-items-center scroll-container position-relative'>
              {isLoadingMovies && <Loader />}

              {!!searchedMovies.movies.length &&
                searchedMovies.movies.map((movie, index) => (
                  <Movie movie={movie} key={`searched-movie-${index}`} />
                ))}

              {currentCategory === 'upcoming' &&
                !searchedMovies.movies.length &&
                upComingMovies.movies.map((movie, index) => (
                  <Movie movie={movie} key={`upcoming-movie-${index}`} />
                ))}

              {currentCategory === 'top_rated' &&
                !searchedMovies.movies.length &&
                topRatedMovies.movies.map((movie, index) => (
                  <Movie movie={movie} key={`topRated-movie-${index}`} />
                ))}

              {currentCategory === 'popular' &&
                !searchedMovies.movies.length &&
                popularMovies.movies.map((movie, index) => (
                  <Movie movie={movie} key={`popular-movie-${index}`} />
                ))}

              <div ref={this.observerRef} className='position-relative observer w-100' />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connector(MainPage);
