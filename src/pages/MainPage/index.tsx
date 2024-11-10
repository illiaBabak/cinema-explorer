import { Component } from 'react';
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
import { MOVIE_CATEGORIES } from 'src/utils/constants';
import { removeUnderlines } from 'src/utils/removeUnderlines';

const mapStateToProps = (state: { movie: MovieInitialStateType }) => ({
  upComingMovies: state.movie.upComingMovies,
  topRatedMovies: state.movie.topRatedMovies,
  popularMovies: state.movie.popularMovies,
  currentCategory: state.movie.currentCategory,
  isLoadingMovies: state.movie.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch<MovieAction>) => ({
  setUpComingMovies: (movies: MovieType[]) => dispatch(movieSetUpComingList(movies)),
  setTopRatedMovies: (movies: MovieType[]) => dispatch(movieSetTopRatedList(movies)),
  setPopularMovies: (movies: MovieType[]) => dispatch(movieSetPopularList(movies)),
  setCurrentCategory: (category: (typeof MOVIE_CATEGORIES)[number]) =>
    dispatch(movieSetCurrentCategory(category)),
  setIsLoadingMovies: (isLoading: boolean) => dispatch(movieSetIsLoading(isLoading)),
  setMovieGenres: (genres: Genre[]) => dispatch(movieSetGenres(genres)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class MainPage extends Component<ConnectedProps<typeof connector>> {
  isInitialized = true;

  setMovies = async (category: (typeof MOVIE_CATEGORIES)[number]): Promise<void> => {
    this.props.setCurrentCategory(category);
    this.props.setIsLoadingMovies(true);

    const movies = await getMovies(category);

    switch (category) {
      case 'upcoming':
        this.props.setUpComingMovies(movies);
        break;

      case 'popular':
        this.props.setPopularMovies(movies);
        break;

      case 'top_rated':
        this.props.setTopRatedMovies(movies);
        break;
    }

    this.props.setIsLoadingMovies(false);
  };

  setGenres = async () => {
    const genres = await getGenres();

    this.props.setMovieGenres(genres);
  };

  componentDidMount(): void {
    if (!this.isInitialized) return;

    this.isInitialized = false;
    this.setGenres();
    this.setMovies(this.props.currentCategory);
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
            {isLoadingMovies ? (
              <Loader />
            ) : (
              <div className='d-flex flex-row w-100 h-100 flex-wrap justify-content-center align-items-center scroll-container'>
                {currentCategory === 'upcoming' &&
                  upComingMovies.map((movie, index) => (
                    <Movie movie={movie} key={`upcoming-movie-${index}`} />
                  ))}

                {currentCategory === 'top_rated' &&
                  topRatedMovies.map((movie, index) => (
                    <Movie movie={movie} key={`topRated-movie-${index}`} />
                  ))}

                {currentCategory === 'popular' &&
                  popularMovies.map((movie, index) => (
                    <Movie movie={movie} key={`popular-movie-${index}`} />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connector(MainPage);
