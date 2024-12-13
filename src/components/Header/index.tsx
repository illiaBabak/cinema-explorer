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
import { MovieIncomplete } from 'src/types';
import ThemeBtn from '../ThemeBtn';

const mapStateToProps = (state: { movie: MovieInitialStateType }) => ({
  searchedMovies: state.movie.searchedMovies,
  query: state.movie.query,
});

const mapDispatchToProps = (dispatch: Dispatch<MovieAction>) => ({
  setSearchedMovies: ({
    movies,
    page,
    maxPages,
  }: {
    movies: MovieIncomplete[];
    page: number;
    maxPages: number;
  }) => dispatch(movieSetSearchedList({ movies, page, maxPages })),
  setQuery: (query: string) => dispatch(movieSetQuery(query)),
  setIsLoadingMovies: (isLoading: boolean) => dispatch(movieSetIsLoading(isLoading)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class Header extends Component<ConnectedProps<typeof connector>> {
  isInitialized = true;

  handleSearch = async () => {
    const { setSearchedMovies, query, setIsLoadingMovies, searchedMovies } = this.props;

    const params = new URLSearchParams(window.location.search);
    params.set('query', query);

    setIsLoadingMovies(true);

    const { movies, maxPages } = await getSearchedMovies(query, searchedMovies.page);

    setSearchedMovies({
      movies: [...movies],
      page: ++searchedMovies.page,
      maxPages,
    });

    setIsLoadingMovies(false);
  };

  componentDidMount(): void {
    this.handleSearch();
  }

  render(): JSX.Element {
    const { setQuery, query, setSearchedMovies } = this.props;

    return (
      <div className='d-flex flex-row align-items-center justify-content-between header w-100 p-3'>
        <div className='input-wrapper position-relative d-flex align-items-center'>
          <input
            className='search-input fs-5 p-2'
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
                  page: 1,
                  maxPages: 1,
                });
              }}
            >
              x
            </div>
          )}
        </div>
        <ThemeBtn />
      </div>
    );
  }
}

export default connector(Header);
