import { Component, JSX } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import {
  MovieAction,
  movieSetCurrentCategory,
  movieSetIsLoading,
  movieSetQuery,
  movieSetSearchedList,
} from 'src/actions/movieActions';
import { getSearchedMovies } from 'src/api/movie';
import { MovieInitialStateType } from 'src/reducers/movieReducer';
import { MoviePageData } from 'src/types';
import ThemeBtn from '../ThemeBtn';
import LanguageDrodown from '../LanguageDrodown';
import { MOVIE_CATEGORIES } from 'src/utils/constants';

const mapStateToProps = (state: { movie: MovieInitialStateType }) => ({
  searchedMovies: state.movie.searchedMovies,
  query: state.movie.query,
});

const mapDispatchToProps = (dispatch: Dispatch<MovieAction>) => ({
  setSearchedMovies: ({ movies, page, maxPages }: MoviePageData) =>
    dispatch(movieSetSearchedList({ movies, page, maxPages })),
  setQuery: (query: string) => dispatch(movieSetQuery(query)),
  setIsLoadingMovies: (isLoading: boolean) => dispatch(movieSetIsLoading(isLoading)),
  setCategory: (category: (typeof MOVIE_CATEGORIES)[number]) =>
    dispatch(movieSetCurrentCategory(category)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class Header extends Component<ConnectedProps<typeof connector>> {
  handleSearch = async () => {
    const { setSearchedMovies, query, setIsLoadingMovies, searchedMovies, setCategory } =
      this.props;

    const params = new URLSearchParams(window.location.search);

    if (query) {
      setCategory('');

      params.set('query', query);
      params.delete('category');
    } else {
      this.clearSearch();
      return;
    }

    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);

    setIsLoadingMovies(true);

    const { movies, maxPages } = await getSearchedMovies(query, 1);

    setSearchedMovies({
      movies: [...movies],
      page: ++searchedMovies.page,
      maxPages,
    });

    setIsLoadingMovies(false);
  };

  clearSearch = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete('query');

    this.props.setQuery('');

    this.props.setSearchedMovies({
      movies: [],
      page: 1,
      maxPages: 1,
    });

    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  componentDidMount(): void {
    this.handleSearch();
  }

  render(): JSX.Element {
    const { setQuery, query } = this.props;

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

                this.clearSearch();
              }}
            >
              x
            </div>
          )}
        </div>
        <div className='d-flex flex-row'>
          <LanguageDrodown />
          <ThemeBtn />
        </div>
      </div>
    );
  }
}

export default connector(Header);
