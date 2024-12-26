import { Component } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import {
  MovieAction,
  movieSetCredits,
  movieSetCurrentCategory,
  movieSetFullInfo,
  movieSetIsLoading,
} from 'src/actions/movieActions';
import { getCredits, getMovie } from 'src/api/movie';
import LanguageDrodown from 'src/components/LanguageDrodown';
import { Loader } from 'src/components/Loader';
import SideBar from 'src/components/SideBar';
import ThemeBtn from 'src/components/ThemeBtn';
import { pageConfig } from 'src/config/pages';
import { MovieInitialStateType } from 'src/reducers/movieReducer';
import { Credits, MovieDetails, MovieType } from 'src/types';
import { MOVIE_CATEGORIES } from 'src/utils/constants';
import { formatDate } from 'src/utils/formatDate';
import { getLanguageFromParams } from 'src/utils/getLanguageFromParams';

const mapStateToProps = (state: { movie: MovieInitialStateType }) => ({
  movieFullInfo: state.movie.movieFullInfo,
  credits: state.movie.credits,
  category: state.movie.currentCategory,
  isLoading: state.movie.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch<MovieAction>) => ({
  setMovieFullInfo: (movieFullInfo: (MovieType & MovieDetails) | null) =>
    dispatch(movieSetFullInfo(movieFullInfo)),
  setCredits: (credits: Credits | null) => dispatch(movieSetCredits(credits)),
  setCategory: (category: (typeof MOVIE_CATEGORIES)[number]) =>
    dispatch(movieSetCurrentCategory(category)),
  setIsLoading: (isLoading: boolean) => dispatch(movieSetIsLoading(isLoading)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class MoviePage extends Component<ConnectedProps<typeof connector>> {
  isInitialized = true;

  getData = async () => {
    this.props.setIsLoading(true);

    const movieId = Number(new URLSearchParams(location.search).get('id')) ?? 0;
    const category = new URLSearchParams(location.search).get('category') ?? 'upcoming';

    const movie = await getMovie(movieId);

    const credits = await getCredits(movieId);

    this.props.setMovieFullInfo(movie);

    this.props.setCredits(credits);

    this.props.setCategory(category);

    this.props.setIsLoading(false);
  };

  componentDidMount(): void {
    if (!this.isInitialized) return;

    this.isInitialized = false;

    this.getData();
  }

  render(): JSX.Element {
    const { movieFullInfo, credits, category, isLoading } = this.props;

    const params = new URLSearchParams(window.location.search);

    const query = params.get('query');

    const previousPage = params.get('previous');

    return (
      <div className='movie-page d-flex flex-row h-100 position-relative flex-grow-1'>
        <SideBar isFullView={false} />
        <div className='d-flex content'>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {movieFullInfo?.backdrop_path && (
                <img
                  className='object-fit-cover h-100 background position-absolute flex-grow-1'
                  src={`http://image.tmdb.org/t/p/w1280${movieFullInfo.backdrop_path}`}
                  alt='background'
                />
              )}
              <div className='d-flex flex-column w-100 h-100 p-3 content'>
                <div className='d-flex flex-row w-100'>
                  <Breadcrumb className='d-flex align-self-start me-auto breadcrumb'>
                    <Breadcrumb.Item
                      className='item'
                      href={`${previousPage}?language=${getLanguageFromParams()}&category=${category}${
                        query ? `&query=${query}` : ''
                      }`}
                    >
                      &lt;- Back
                    </Breadcrumb.Item>
                    <Breadcrumb.Item className='item' active>
                      {movieFullInfo?.original_title}
                    </Breadcrumb.Item>
                  </Breadcrumb>

                  <div className='d-flex flex-row align-items-center'>
                    <LanguageDrodown />
                    <ThemeBtn />
                  </div>
                </div>

                <div className='d-flex w-100 flex-row align-items-center justify-content-center align-self-center p-2 m-auto'>
                  <img
                    className='object-fit-cover poster'
                    src={`http://image.tmdb.org/t/p/w780${movieFullInfo?.poster_path}`}
                    alt='poster'
                  />
                  <div className='d-flex flex-column justify-content-between ms-3 text-white h-100 w-50'>
                    <div className='d-flex flex-column w-100'>
                      <h2>{movieFullInfo?.original_title}</h2>
                      <div className='d-flex flex-row align-items-center mt-3 fst-italic'>
                        {movieFullInfo?.genres.map(({ name }, index) => {
                          return (
                            <p className='mb-0 ms-1' key={`genre-${index}`}>
                              {name}
                              {index === movieFullInfo.genres.length - 1 ||
                              movieFullInfo.genres.length === 1
                                ? ''
                                : ','}
                            </p>
                          );
                        })}
                      </div>
                      <p className='mb-0 mt-1 fst-italic'>
                        Runtime: {Math.floor((movieFullInfo?.runtime ?? 1) / 60)}h{' '}
                        {(movieFullInfo?.runtime ?? 1) -
                          Math.floor((movieFullInfo?.runtime ?? 1) / 60) * 60}
                        minutes
                      </p>
                      <p className='mb-0 mt-3 fst-italic'>Status: {movieFullInfo?.status}</p>
                      <p className='mb-0 mt-3 fst-italic'>
                        {formatDate(movieFullInfo?.release_date ?? '')}
                      </p>
                      <p className='mb-0 mt-4'>{movieFullInfo?.overview}</p>
                    </div>

                    <div className='d-flex flex-row scroll-container-x casts-container w-100'>
                      {credits?.cast.map((el, index) => (
                        <div
                          onClick={() =>
                            (window.location.href = `${
                              pageConfig.person
                            }?language=${getLanguageFromParams()}&person-id=${el.id}&id=${
                              movieFullInfo?.id
                            }&category=${category}&previous=${previousPage}&movie-title=${
                              movieFullInfo?.original_title
                            }`)
                          }
                          key={`cast-${index}-${el.name}`}
                          className='d-flex flex-column justify-content-between align-items-center cast text-center mx-3'
                        >
                          <img
                            className='rounded-circle object-fit-cover cast-img'
                            src={`${
                              el.profile_path
                                ? `http://image.tmdb.org/t/p/w154${el.profile_path}`
                                : '/images/pfp.webp'
                            }`}
                            alt='cast-icon'
                          />

                          <div className='d-flex flex-column align-items-center justify-content-center h-100'>
                            <h6 className='mt-2'>{el.name}</h6>
                            <i className='mt-1 character'>{el.character}</i>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default connector(MoviePage);
