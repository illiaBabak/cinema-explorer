import { Component, JSX } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { MovieAction, movieSetIsLoading } from 'src/actions/movieActions';
import { PersonAction, personSetFullInfo } from 'src/actions/personActions';
import { getPerson } from 'src/api/person';
import LanguageDrodown from 'src/components/LanguageDrodown';
import { Loader } from 'src/components/Loader';
import SideBar from 'src/components/SideBar';
import ThemeBtn from 'src/components/ThemeBtn';
import { pageConfig } from 'src/config/pages';
import { AppViewInitialStateType } from 'src/reducers/appViewReducer';
import { MovieInitialStateType } from 'src/reducers/movieReducer';
import { PersonInitialStateType } from 'src/reducers/personReducer';
import { Person } from 'src/types';
import { formatDate } from 'src/utils/formatDate';
import { getLanguageFromParams } from 'src/utils/getLanguageFromParams';

const mapStateToProps = (state: {
  person: PersonInitialStateType;
  movie: MovieInitialStateType;
  appView: AppViewInitialStateType;
}) => ({
  personInfo: state.person.personInfo,
  isLoading: state.movie.isLoading,
  currentLanguage: state.appView.currentLanguage,
});

const mapDispatchToProps = (dispatch: Dispatch<PersonAction | MovieAction>) => ({
  setIsLoading: (isLoading: boolean) => dispatch(movieSetIsLoading(isLoading)),
  setPersonInfo: (personInfo: Person | null) => dispatch(personSetFullInfo(personInfo)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class PersonPage extends Component<ConnectedProps<typeof connector>> {
  isInitialized = true;

  state = {
    movieId: new URLSearchParams(window.location.search).get('id'),
    category: new URLSearchParams(window.location.search).get('category'),
    previousPage: new URLSearchParams(window.location.search).get('previous'),
    movieTitle: new URLSearchParams(window.location.search).get('movie-title'),
  };

  getPersonData = async () => {
    this.props.setIsLoading(true);

    const params = new URLSearchParams(window.location.search);

    const personId = Number(params.get('person-id'));

    const data = await getPerson(personId);

    if (!data)
      window.location.href = `${pageConfig.movie}?language=${getLanguageFromParams()}&id=${
        this.state.movieId
      }&category=${this.state.category}&previous=${
        this.state.previousPage
      }&alert=Person not found :(`;

    this.props.setPersonInfo(data);

    this.props.setIsLoading(false);
  };

  componentDidMount(): void {
    if (!this.isInitialized) return;

    this.isInitialized = false;

    this.getPersonData();
  }

  render(): JSX.Element {
    const { isLoading, personInfo, currentLanguage } = this.props;

    const { movieId, movieTitle, category, previousPage } = this.state;

    return (
      <div className='person-page d-flex flex-row h-100 position-relative flex-grow-1'>
        <SideBar isFullView={false} />
        <div className='d-flex content'>
          {isLoading ? (
            <Loader />
          ) : (
            <div className='d-flex flex-column w-100 h-100 p-3 content'>
              <div className='w-100 d-flex flex-row align-items-center'>
                <Breadcrumb className='d-flex align-self-start me-auto breadcrumb'>
                  <Breadcrumb.Item
                    className='item'
                    href={`${previousPage}?language=${getLanguageFromParams()}`}
                  >
                    &lt;- Home
                  </Breadcrumb.Item>
                  <Breadcrumb.Item
                    className='item'
                    href={`${
                      pageConfig.movie
                    }?language=${getLanguageFromParams()}&id=${movieId}&category=${category}&previous=${previousPage}`}
                  >
                    &lt;- {movieTitle}
                  </Breadcrumb.Item>
                  <Breadcrumb.Item className='item' active>
                    {personInfo?.name}
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
                  src={`http://image.tmdb.org/t/p/w780${personInfo?.profile_path}`}
                  onError={(e) => {
                    e.currentTarget.src = 'images/pfp.webp';
                  }}
                  alt='poster'
                />
                <div className='d-flex flex-column justify-content-start ms-3 h-100 w-50'>
                  <h2>{personInfo?.name}</h2>
                  <i className='mt-3'>{personInfo?.known_for_department ?? 'unknown'}</i>
                  <i className='mt-3'>Place of birth: {personInfo?.place_of_birth ?? 'unknown'}</i>
                  <i className='mt-3'>
                    Birthday:{' '}
                    {personInfo?.birthday
                      ? formatDate(personInfo?.birthday, currentLanguage)
                      : 'unknown'}
                  </i>
                  {personInfo?.deathday && <i className='mt-3'>{personInfo.deathday}</i>}
                  <p className='biography scroll-container-y mt-4'>{personInfo?.biography}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connector(PersonPage);
