import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import {
  MovieAction,
  movieSetFavouriteList,
  movieSetGenres,
  movieSetIsLoading,
} from 'src/actions/movieActions';
import { getFavouriteOrWatchlistMovies, getGenres } from 'src/api/movie';
import LanguageDrodown from 'src/components/LanguageDrodown';
import { Loader } from 'src/components/Loader';
import Movie from 'src/components/Movie';
import SideBar from 'src/components/SideBar';
import ThemeBtn from 'src/components/ThemeBtn';
import { MovieInitialStateType } from 'src/reducers/movieReducer';
import { UserInitialStateType } from 'src/reducers/userReducer';
import { Genre, MovieDetails, MovieWithGenres } from 'src/types';
import { isMovieWithGenres } from 'src/utils/guards';

const mapStateToProps = (state: { movie: MovieInitialStateType; user: UserInitialStateType }) => ({
  favouriteMovies: state.movie.favouriteMovies,
  isLoading: state.movie.isLoading,
  accountID: state.user.user?.id ?? 0,
});

const mapDispatchToProps = (dispatch: Dispatch<MovieAction>) => ({
  setFavouriteMovies: (movies: (MovieWithGenres | MovieDetails | null)[]) =>
    dispatch(movieSetFavouriteList(movies)),
  setIsLoading: (isLoading: boolean) => dispatch(movieSetIsLoading(isLoading)),
  setGenres: (genres: Genre[]) => dispatch(movieSetGenres(genres)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class FavouritePage extends Component<ConnectedProps<typeof connector>> {
  isInitialized = true;

  setFavouriteMovies = async () => {
    this.props.setIsLoading(true);

    const movies = await getFavouriteOrWatchlistMovies(this.props.accountID, true);

    this.props.setFavouriteMovies(movies);

    const genres = await getGenres();

    this.props.setGenres(genres);

    this.props.setIsLoading(false);
  };

  componentDidMount(): void {
    if (!this.isInitialized) return;

    this.isInitialized = false;

    this.setFavouriteMovies();
  }

  render(): JSX.Element {
    const { favouriteMovies, isLoading } = this.props;

    return (
      <div className='favourite-page d-flex flex-row justify-content-start w-100 h-100'>
        <SideBar isFullView={true} />

        <div className='d-flex flex-column w-100 h-100 py-2'>
          <div className='d-flex flex-row align-items-center m-2 me-3 btns-wrapper'>
            <LanguageDrodown />
            <ThemeBtn />
          </div>

          <div className='d-flex flex-row justify-content-center scroll-container-y flex-wrap'>
            {isLoading && <Loader />}

            {!!favouriteMovies.length &&
              favouriteMovies.map((movie, index) => {
                return (
                  isMovieWithGenres(movie) && (
                    <Movie key={`favourite-movie-${index}-${movie?.id}`} movie={movie} />
                  )
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default connector(FavouritePage);
