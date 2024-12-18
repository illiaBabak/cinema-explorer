import { Component } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { MovieAction, movieSetIsLoading } from 'src/actions/movieActions';
import { PersonAction, personSetFullInfo } from 'src/actions/personActions';
import { getPerson } from 'src/api/person';
import { Loader } from 'src/components/Loader';
import SideBar from 'src/components/SideBar';
import { pageConfig } from 'src/config/pages';
import { MovieInitialStateType } from 'src/reducers/movieReducer';
import { PersonInitialStateType } from 'src/reducers/personReducer';
import { Person } from 'src/types';

const mapStateToProps = (state: {
  person: PersonInitialStateType;
  movie: MovieInitialStateType;
}) => ({
  personInfo: state.person.personInfo,
  isLoading: state.movie.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch<PersonAction | MovieAction>) => ({
  setIsLoading: (isLoading: boolean) => dispatch(movieSetIsLoading(isLoading)),
  setPersonInfo: (personInfo: Person | null) => dispatch(personSetFullInfo(personInfo)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class PersonPage extends Component<ConnectedProps<typeof connector>> {
  isInitialized = true;

  getPersonData = async () => {
    this.props.setIsLoading(true);

    const params = new URLSearchParams(window.location.search);

    const personId = Number(params.get('person-id'));

    const data = await getPerson(personId);

    this.props.setPersonInfo(data);

    this.props.setIsLoading(false);
  };

  componentDidMount(): void {
    if (!this.isInitialized) return;

    this.isInitialized = false;

    this.getPersonData();
  }

  render(): JSX.Element {
    const { isLoading, personInfo } = this.props;

    const params = new URLSearchParams(window.location.search);

    const movieId = params.get('id');

    const category = params.get('category');

    const previousPage = params.get('previous');

    const movieTitle = params.get('movie-title');

    return (
      <div className='person-page d-flex flex-row h-100 position-relative flex-grow-1'>
        <SideBar isFullView={false} />
        <div className='d-flex content'>
          {isLoading ? (
            <Loader />
          ) : (
            <div className='d-flex flex-column w-100 h-100 p-3 content'>
              <Breadcrumb className='d-flex align-self-start me-auto breadcrumb'>
                <Breadcrumb.Item className='item' href={`${previousPage}`}>
                  &lt;- Home
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  className='item'
                  href={`${pageConfig.movie}?id=${movieId}&category=${category}&previous=${previousPage}`}
                >
                  &lt;- {movieTitle}
                </Breadcrumb.Item>
                <Breadcrumb.Item className='item' active>
                  {personInfo?.name}
                </Breadcrumb.Item>
              </Breadcrumb>
              <div className='d-flex w-100 flex-row align-items-center justify-content-center align-self-center p-2 m-auto'>
                <img
                  className='object-fit-cover poster'
                  src={`http://image.tmdb.org/t/p/w780${personInfo?.profile_path}`}
                  alt='poster'
                />
                <div className='d-flex flex-column justify-content-start ms-3 text-white h-100 w-50'>
                  <h2>{personInfo?.name}</h2>
                  <i className='mt-3'>{personInfo?.known_for_department}</i>
                  <i className='mt-3'>Place of birth: {personInfo?.place_of_birth}</i>
                  <i className='mt-3'>Birthday: {personInfo?.birthday}</i>
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
