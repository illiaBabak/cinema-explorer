import { Component, createRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import {
  MovieAction,
  movieSetCurrentCategory,
  movieSetGenres,
  movieSetIsLoading,
  movieSetPopularList,
  movieSetTopRatedList,
  movieSetUpComingList,
} from 'src/actions/movieActions';
import { getGenres, getMovies } from 'src/api/movie';
import { Header } from 'src/components/Header';
import { Loader } from 'src/components/Loader';
import Movie from 'src/components/Movie';
import SideBar from 'src/components/SideBar';
import { MovieInitialStateType } from 'src/reducers/movieReducer';
import { Genre, MovieType } from 'src/types';
import { capitalize } from 'src/utils/capitalize';
import { MOVIE_CATEGORIES, OBSERVER_OPTIONS } from 'src/utils/constants';
import { removeUnderlines } from 'src/utils/removeUnderlines';

const mapStateToProps = (state: { movie: MovieInitialStateType }) => ({
  upComingMovies: state.movie.upComingMovies,
  topRatedMovies: state.movie.topRatedMovies,
  popularMovies: state.movie.popularMovies,
  currentCategory: state.movie.currentCategory,
  isLoadingMovies: state.movie.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch<MovieAction>) => ({
  setUpComingMovies: ({
    movies,
    page,
    maxPages,
  }: {
    movies: MovieType[];
    page: number;
    maxPages: number;
  }) => dispatch(movieSetUpComingList({ movies, page, maxPages })),
  setTopRatedMovies: ({
    movies,
    page,
    maxPages,
  }: {
    movies: MovieType[];
    page: number;
    maxPages: number;
  }) => dispatch(movieSetTopRatedList({ movies, page, maxPages })),
  setPopularMovies: ({
    movies,
    page,
    maxPages,
  }: {
    movies: MovieType[];
    page: number;
    maxPages: number;
  }) => dispatch(movieSetPopularList({ movies, page, maxPages })),
  setCurrentCategory: (category: (typeof MOVIE_CATEGORIES)[number]) =>
    dispatch(movieSetCurrentCategory(category)),
  setIsLoadingMovies: (isLoading: boolean) => dispatch(movieSetIsLoading(isLoading)),
  setMovieGenres: (genres: Genre[]) => dispatch(movieSetGenres(genres)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class MainPage extends Component<ConnectedProps<typeof connector>> {
  isInitialized = true;
  observer: IntersectionObserver | null = null;
  observerRef = createRef<HTMLDivElement>();

  setMovies = async (category: (typeof MOVIE_CATEGORIES)[number]): Promise<void> => {
    const {
      setCurrentCategory,
      setIsLoadingMovies,
      upComingMovies,
      setUpComingMovies,
      popularMovies,
      setPopularMovies,
      topRatedMovies,
      setTopRatedMovies,
    } = this.props;

    setCurrentCategory(category);
    setIsLoadingMovies(true);

    if (category === 'upcoming' && upComingMovies.page <= upComingMovies.maxPages) {
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
    } = this.props;

    switch (currentCategory) {
      case 'upcoming':
        setUpComingMovies({
          movies: [...upComingMovies.movies],
          page: ++upComingMovies.page,
          maxPages: upComingMovies.maxPages,
        });

        break;

      case 'popular':
        setPopularMovies({
          movies: [...popularMovies.movies],
          page: ++popularMovies.page,
          maxPages: popularMovies.maxPages,
        });

        break;

      case 'top_rated':
        setTopRatedMovies({
          movies: [...topRatedMovies.movies],
          page: ++topRatedMovies.page,
          maxPages: topRatedMovies.maxPages,
        });

        break;
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

  componentDidMount(): void {
    if (this.observerRef.current && !this.isInitialized)
      setTimeout(() => this.handleObserver(this.observerRef.current), 0);

    if (!this.isInitialized) return;

    this.isInitialized = false;
    this.setGenres();
    this.setMovies(this.props.currentCategory);
  }

  componentWillUnmount(): void {
    if (this.observer) this.observer.disconnect();
  }

  render(): JSX.Element {
    const { currentCategory, upComingMovies, topRatedMovies, popularMovies, isLoadingMovies } =
      this.props;

    return (
      <div className='main-page d-flex flex-row justify-content-start w-100 h-100'>
        <SideBar />
        <div className='d-flex flex-column justify-content-start align-items-center content h-100'>
          <Header />
          <div className='main-content d-flex flex-column justify-content-start align-items-start w-100 h-100 position-relative'>
            <div className='d-flex flex-row categories'>
              {MOVIE_CATEGORIES.map((category, index) => (
                <div
                  className={`category ${
                    category === currentCategory ? 'selected-category' : ''
                  } text-white d-flex justify-content-center align-items-center m-3 p-1 rounded`}
                  key={`${category}-${index}-category`}
                  onClick={() => this.setMovies(category)}
                >
                  {removeUnderlines(capitalize(category))}
                </div>
              ))}
            </div>
            <div className='d-flex flex-row w-100 h-100 flex-wrap justify-content-center align-items-center scroll-container position-relative'>
              {isLoadingMovies && <Loader />}

              {currentCategory === 'upcoming' &&
                upComingMovies.movies.map((movie, index) => (
                  <Movie movie={movie} key={`upcoming-movie-${index}`} />
                ))}

              {currentCategory === 'top_rated' &&
                topRatedMovies.movies.map((movie, index) => (
                  <Movie movie={movie} key={`topRated-movie-${index}`} />
                ))}

              {currentCategory === 'popular' &&
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
