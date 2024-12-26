import { Component, createRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { MovieAction, movieSetFavourite, movieSetWatchlist } from 'src/actions/movieActions';
import { addOrDeleteFavorite, addOrDeleteToWatchlist } from 'src/api/movie';
import { pageConfig } from 'src/config/pages';
import { MovieInitialStateType } from 'src/reducers/movieReducer';
import { UserInitialStateType } from 'src/reducers/userReducer';
import { MovieDetails, MovieIncomplete } from 'src/types';
import { getLanguageFromParams } from 'src/utils/getLanguageFromParams';

type Props = {
  movie: MovieIncomplete;
};

type State = {
  menuOptions: {
    position: 'left' | 'right';
    shouldShowMenu: boolean;
  };
};

const mapStateToProps = (state: { movie: MovieInitialStateType; user: UserInitialStateType }) => ({
  genres: state.movie.genres,
  accountID: state.user.user?.id ?? 0,
  favouriteMovies: state.movie.favouriteMovies,
  watchlistMovies: state.movie.watchlistMovies,
  currentCategory: state.movie.currentCategory,
  query: state.movie.query,
});

const mapDispatchToProps = (dispatch: Dispatch<MovieAction>) => ({
  setFavouriteMovies: (movies: (MovieIncomplete | MovieDetails | null)[]) =>
    dispatch(movieSetFavourite(movies)),
  setWatchlistMovies: (movies: (MovieIncomplete | MovieDetails | null)[]) =>
    dispatch(movieSetWatchlist(movies)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class Movie extends Component<ConnectedProps<typeof connector> & Props> {
  state: State = {
    menuOptions: {
      position: 'right',
      shouldShowMenu: false,
    },
  };

  menuRef = createRef<HTMLDivElement>();

  handleShowMenu = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (this.state.menuOptions.shouldShowMenu) {
      this.setState({
        menuOptions: {
          shouldShowMenu: false,
        },
      });
      return;
    }

    const btnCoords = e.currentTarget.getBoundingClientRect().left ?? 0;

    const menuPosition = window.innerWidth < btnCoords + 240 ? 'left' : 'right'; //240px = menu width

    this.setState({
      menuOptions: {
        position: menuPosition,
        shouldShowMenu: true,
      },
    });
  };

  render(): JSX.Element {
    const {
      movie,
      genres,
      accountID,
      favouriteMovies,
      setFavouriteMovies,
      watchlistMovies,
      setWatchlistMovies,
      currentCategory,
      query,
    } = this.props;

    const positionClass = `${this.state.menuOptions.position}-position`;

    const isFavouriteMovie = favouriteMovies.some(
      (favouriteMovie) => favouriteMovie?.id === movie.id
    );

    const isWatchlistMovie = watchlistMovies.some(
      (watchlistMovie) => watchlistMovie?.id === movie.id
    );

    return (
      <div
        className='movie-card-wrapper p-2 m-3 rounded'
        onClick={() =>
          (window.location.href = `${pageConfig.movie}?language=${getLanguageFromParams()}&id=${
            movie.id
          }&category=${currentCategory}&previous=${window.location.pathname}${
            query ? `&query=${query}` : ''
          }`)
        }
      >
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

          {this.state.menuOptions.shouldShowMenu && (
            <div
              className={`d-flex flex-column position-absolute menu ${positionClass}`}
              ref={this.menuRef}
            >
              <div
                className='option d-flex flex-row align-items-center justify-content-start p-1 rounded-top'
                onClick={(e) => {
                  e.stopPropagation();

                  addOrDeleteFavorite(movie.id, !isFavouriteMovie, accountID);
                  setFavouriteMovies(
                    !isFavouriteMovie
                      ? [...favouriteMovies, movie]
                      : favouriteMovies.filter((favouriteMovie) => favouriteMovie?.id !== movie.id)
                  );
                }}
              >
                <img
                  className='object-fit-contain option-img'
                  src={`${isFavouriteMovie ? '/images/filled-heart.png' : '/images/heart.png'}`}
                  alt='heart'
                />
                <p className='m-0 ms-2'>{isFavouriteMovie ? 'Delete from' : 'Add to'} favourites</p>
              </div>
              <div
                className='option d-flex flex-row align-items-center justify-content-start p-1 rounded-bottom'
                onClick={(e) => {
                  e.stopPropagation();

                  addOrDeleteToWatchlist(movie.id, !isWatchlistMovie, accountID);
                  setWatchlistMovies(
                    !isWatchlistMovie
                      ? [...watchlistMovies, movie]
                      : watchlistMovies.filter((watchlistMovie) => watchlistMovie?.id !== movie.id)
                  );
                }}
              >
                <img
                  className='object-fit-contain option-img'
                  src={`${isWatchlistMovie ? '/images/remove.png' : '/images/watchlist.png'}`}
                  alt='list'
                />
                <p className='m-0 ms-2'>{isWatchlistMovie ? 'Delete from' : 'Add to'} watchlist</p>
              </div>
            </div>
          )}

          <img
            className='menu-btn object-fit-contain position-absolute'
            src='/images/menu.png'
            alt='dots'
            onClick={(e) => this.handleShowMenu(e)}
          />
        </div>
      </div>
    );
  }
}

export default connector(Movie);
