import { Component, createRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import {
  MovieAction,
  movieSetFavourite,
  movieSetMenuCoords,
  movieSetShouldShowMenu,
  movieSetWatchlist,
} from 'src/actions/movieActions';
import { addOrDeleteFavorite, addOrDeleteToWatchlist } from 'src/api/movie';
import { MovieInitialStateType } from 'src/reducers/movieReducer';
import { UserInitialStateType } from 'src/reducers/userReducer';
import { MovieType } from 'src/types';

type Props = {
  movie: MovieType;
};

const mapStateToProps = (
  state: { movie: MovieInitialStateType; user: UserInitialStateType },
  props: Props
) => ({
  genres: state.movie.genres,
  shouldShowMenu: state.movie.shouldShowMenu === props.movie.id,
  menuCoords: state.movie.menuCoords,
  accountID: state.user.user?.id ?? 0,
  favouriteMovies: state.movie.favouriteMovies,
  watchlistMovies: state.movie.watchlistMovies,
});

const mapDispatchToProps = (dispatch: Dispatch<MovieAction>) => ({
  setShouldShowMenu: (movieId: number) => dispatch(movieSetShouldShowMenu(movieId)),
  setMenuCoords: (coords: number) => dispatch(movieSetMenuCoords(coords)),
  setFavouriteMovies: (movies: MovieType[]) => dispatch(movieSetFavourite(movies)),
  setWatchlistMovies: (movies: MovieType[]) => dispatch(movieSetWatchlist(movies)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class Movie extends Component<ConnectedProps<typeof connector> & Props> {
  menuRef = createRef<HTMLDivElement>();

  componentDidUpdate(prevProps: ConnectedProps<typeof connector> & Props) {
    if (!prevProps.shouldShowMenu && this.props.shouldShowMenu) {
      const menuCoordinates = this.menuRef.current?.getBoundingClientRect().right ?? 0;

      if (menuCoordinates) this.props.setMenuCoords(menuCoordinates);
    }
  }

  handleShowMenu = (movieId: number) => {
    this.props.setShouldShowMenu(this.props.shouldShowMenu ? 0 : movieId);
    if (this.props.menuCoords) this.props.setMenuCoords(0);
  };

  render(): JSX.Element {
    const {
      movie,
      genres,
      shouldShowMenu,
      menuCoords,
      accountID,
      favouriteMovies,
      setFavouriteMovies,
      watchlistMovies,
      setWatchlistMovies,
    } = this.props;
    const positionClass = window.innerWidth < menuCoords ? 'left-position' : 'right-position';

    const isFavouriteMovie = favouriteMovies.some(
      (favouriteMovie) => favouriteMovie.id === movie.id
    );

    const isWatchlistMovie = watchlistMovies.some(
      (watchlistMovie) => watchlistMovie.id === movie.id
    );

    return (
      <div className='movie-card-wrapper p-2 m-3 rounded'>
        <div className='movie-card d-flex flex-column align-items-center w-100 h-100 p-3 position-relative'>
          <img
            className='poster object-fit-contain rounded'
            src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`}
            alt='movie-icon'
          />
          <p className='text-center m-0 title'>{movie.original_title}</p>
          <div className='genres d-flex flex-row align-items-center justify-content-center w-100 mt-2'>
            {movie.genre_ids.slice(0, 2).map((genreId, index) => (
              <p
                className='my-0 mx-1 genre fst-italic'
                key={`genre-${genreId}-${index}-${movie.original_title}`}
              >
                {genres[genreId]}
              </p>
            ))}
          </div>

          {shouldShowMenu && (
            <div
              className={`d-flex flex-column position-absolute menu ${positionClass}`}
              ref={this.menuRef}
            >
              <div
                className='option d-flex flex-row align-items-center justify-content-around p-1 rounded-top'
                onClick={() => {
                  addOrDeleteFavorite(movie.id, !isFavouriteMovie, accountID);
                  setFavouriteMovies(
                    !isFavouriteMovie
                      ? [...favouriteMovies, movie]
                      : favouriteMovies.filter((favouriteMovie) => favouriteMovie.id !== movie.id)
                  );
                }}
              >
                <img
                  className='object-fit-contain option-img'
                  src={`${isFavouriteMovie ? '/images/filled-heart.png' : '/images/heart.png'}`}
                  alt='heart'
                />
                <p className='m-0'>{isFavouriteMovie ? 'Delete from' : 'Add to'} favourites</p>
              </div>
              <div
                className='option d-flex flex-row align-items-center justify-content-around p-1 rounded-bottom'
                onClick={() => {
                  addOrDeleteToWatchlist(movie.id, !isWatchlistMovie, accountID);
                  setWatchlistMovies(
                    !isWatchlistMovie
                      ? [...watchlistMovies, movie]
                      : watchlistMovies.filter((watchlistMovie) => watchlistMovie.id !== movie.id)
                  );
                }}
              >
                <img
                  className='object-fit-contain option-img'
                  src={`${isWatchlistMovie ? '/images/remove.png' : '/images/watchlist.png'}`}
                  alt='list'
                />
                <p className='m-0'>{isWatchlistMovie ? 'Delete from' : 'Add to'} watchlist</p>
              </div>
            </div>
          )}

          <img
            className='menu-btn object-fit-contain position-absolute'
            src='/images/menu.png'
            alt='dots'
            onClick={() => this.handleShowMenu(movie.id)}
          />
        </div>
      </div>
    );
  }
}

export default connector(Movie);
