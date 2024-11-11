import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { MovieInitialStateType } from 'src/reducers/movieReducer';
import { MovieType } from 'src/types';

type Props = {
  movie: MovieType;
};

const mapStateToProps = (state: { movie: MovieInitialStateType }) => ({
  genres: state.movie.genres,
});

const connector = connect(mapStateToProps);

class Movie extends Component<ConnectedProps<typeof connector> & Props> {
  render(): JSX.Element {
    const { movie, genres } = this.props;

    return (
      <div className='movie-card-wrapper p-2 m-3 rounded'>
        <div className='movie-card d-flex flex-column align-items-center w-100 h-100 p-3'>
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
        </div>
      </div>
    );
  }
}

export default connector(Movie);
