import { Component } from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import {
  MovieAction,
  movieSetGenres,
  movieSetIsLoading,
  movieSetWatchlist,
} from 'src/actions/movieActions';
import Movie from 'src/components/Movie';
import SideBar from 'src/components/SideBar';
import ThemeBtn from 'src/components/ThemeBtn';
import { MovieInitialStateType } from 'src/reducers/movieReducer';
import { UserInitialStateType } from 'src/reducers/userReducer';
import { Genre, MovieIncomplete } from 'src/types';
import { getFavouriteOrWatchlistMovies, getGenres } from 'src/api/movie';
import { Loader } from 'src/components/Loader';

const mapStateToProps = (state: { movie: MovieInitialStateType; user: UserInitialStateType }) => ({
  watchlistMovies: state.movie.watchlistMovies,
  isLoading: state.movie.isLoading,
  accountID: state.user.user?.id ?? 0,
});

const mapDispatchToProps = (dispatch: Dispatch<MovieAction>) => ({
  setWatchlistMovies: (movies: MovieIncomplete[]) => dispatch(movieSetWatchlist(movies)),
  setIsLoading: (isLoading: boolean) => dispatch(movieSetIsLoading(isLoading)),
  setGenres: (genres: Genre[]) => dispatch(movieSetGenres(genres)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class WatchlistPage extends Component<ConnectedProps<typeof connector>> {
  isInitialized = true;

  setWatchlistMovies = async () => {
    this.props.setIsLoading(true);

    const movies = await getFavouriteOrWatchlistMovies(this.props.accountID, false);

    this.props.setWatchlistMovies(movies);

    const genres = await getGenres();

    this.props.setGenres(genres);

    this.props.setIsLoading(false);
  };

  componentDidMount(): void {
    if (!this.isInitialized) return;

    this.isInitialized = false;

    this.setWatchlistMovies();
  }

  render(): JSX.Element {
    const { watchlistMovies, isLoading } = this.props;

    return (
      <div className='watchlist-page d-flex flex-row justify-content-start w-100 h-100'>
        <SideBar isFullView={true} />

        <div className='d-flex flex-column w-100 h-100 p-2'>
          <div className='m-2 theme-btn-wrapper'>
            <ThemeBtn />
          </div>

          <div className='d-flex flex-row flex-wrap justify-content-center scroll-container-y'>
            {isLoading && <Loader />}

            {!!watchlistMovies.length &&
              watchlistMovies.map((movie, index) => (
                <Movie key={`favourite-movie-${index}-${movie.id}`} movie={movie} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default connector(WatchlistPage);
