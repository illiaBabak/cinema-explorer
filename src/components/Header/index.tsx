import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import {
  MovieAction,
  movieSetIsLoading,
  movieSetQuery,
  movieSetSearchedList,
} from 'src/actions/movieActions';
import { getSearchedMovies } from 'src/api/movie';
import { MovieInitialStateType } from 'src/reducers/movieReducer';
import { MovieType } from 'src/types';

const mapStateToProps = (state: { movie: MovieInitialStateType }) => ({
  searchedMovies: state.movie.searchedMovies,
  query: state.movie.query,
});

const mapDispatchToProps = (dispatch: Dispatch<MovieAction>) => ({
  setSearchedMovies: ({ movies }: { movies: MovieType[] }) =>
    dispatch(movieSetSearchedList({ movies })),
  setQuery: (query: string) => dispatch(movieSetQuery(query)),
  setIsLoadingMovies: (isLoading: boolean) => dispatch(movieSetIsLoading(isLoading)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class Header extends Component<ConnectedProps<typeof connector>> {
  handleSearch = async () => {
    const { setSearchedMovies, query, setIsLoadingMovies } = this.props;

    setIsLoadingMovies(true);

    const movies = await getSearchedMovies(query);

    setSearchedMovies({
      movies: [...movies],
    });

    setIsLoadingMovies(false);
  };

  render(): JSX.Element {
    const { setQuery, query, setSearchedMovies } = this.props;

    return (
      <div className='header w-100 p-3'>
        <div className='input-wrapper position-relative d-flex align-items-center'>
          <input
            className='search-input fs-5'
            placeholder='Write something to find movie...'
            type='text'
            value={query}
            onChange={({ currentTarget: { value } }) => setQuery(value)}
            onBlur={() => this.handleSearch()}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
            }}
          />
          {query && (
            <div
              className='clear-btn position-absolute m-0 d-flex justify-content-center align-items-center'
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();

                setQuery('');

                setSearchedMovies({
                  movies: [],
                });
              }}
            >
              x
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connector(Header);
