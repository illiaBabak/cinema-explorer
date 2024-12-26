import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { LoginAction, loginSetSessionId } from 'src/actions/loginActions';
import { UserAction, userSetInfo, userShouldShowLogoutWindow } from 'src/actions/userActions';
import { getUser } from 'src/api/user';
import { LoginInitialState } from 'src/reducers/loginReducer';
import { UserInitialStateType } from 'src/reducers/userReducer';
import { User } from 'src/types';
import { isString } from 'src/utils/guards';
import LogoutWindow from '../LogoutWindow';
import { pageConfig } from 'src/config/pages';
import { NavLink } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { PageInitialStateType } from 'src/reducers/pageReducer';
import { getLanguageFromParams } from 'src/utils/getLanguageFromParams';

type Props = {
  isFullView: boolean;
};

const mapStateToProps = (state: {
  login: LoginInitialState;
  user: UserInitialStateType;
  page: PageInitialStateType;
}) => ({
  sessionId: state.login.sessionId,
  user: state.user.user,
  shouldShowLogoutWindow: state.user.shouldShowLogoutWindow,
  isLightTheme: state.page.isLightTheme,
});

const mapDispatchToProps = (dispatch: Dispatch<LoginAction | UserAction>) => ({
  setSessionId: (sessionId: string) => dispatch(loginSetSessionId(sessionId)),
  setUserInfo: (userInfo: User) => dispatch(userSetInfo(userInfo)),
  setShouldShowLogoutWindow: (shouldShow: boolean) =>
    dispatch(userShouldShowLogoutWindow(shouldShow)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class SideBar extends Component<ConnectedProps<typeof connector> & Props> {
  isInitialized = false;

  getUserInfo = async (sessionId: string) => {
    const user = await getUser(sessionId);

    if (!user) return;

    this.props.setUserInfo(user);
  };

  getUserImg = () => {
    if (!this.props.user) return;

    const {
      tmdb: { avatar_path },
      gravatar: { hash },
    } = this.props.user.avatar;

    if (avatar_path) return `https://image.tmdb.org/t/p/w200${avatar_path}.png`;
    else if (hash) return `https://secure.gravatar.com/avatar/${hash}.jpg?s=200`;

    return null;
  };

  componentDidMount(): void {
    if (this.isInitialized) return;

    const sessionIdStorage = sessionStorage.getItem('sessionId');
    const parsedSessionId: unknown = sessionIdStorage
      ? JSON.parse(JSON.stringify(sessionIdStorage))
      : null;
    const sessionId = isString(parsedSessionId) ? parsedSessionId : null;

    if (!sessionId) {
      window.location.href = pageConfig.redirect;
      return;
    }

    this.props.setSessionId(sessionId);
    this.getUserInfo(sessionId);
    this.isInitialized = true;
  }

  render(): JSX.Element {
    const { user, setShouldShowLogoutWindow, shouldShowLogoutWindow, isFullView, isLightTheme } =
      this.props;
    const { pathname } = window.location;

    const userImage = this.getUserImg();

    const isHome = pathname.includes('home');
    const isMyMovies = pathname.includes('my-movies');
    const isFavourite = pathname.includes('favourite');

    return (
      <>
        {shouldShowLogoutWindow && <LogoutWindow />}
        <div
          className={`sidebar d-flex flex-column justify-content-between h-100 py-4 ${
            isLightTheme ? 'light-theme' : 'dark-theme'
          } ${
            isFullView
              ? 'full-view px-2  align-items-start'
              : 'shorter-view align-items-center pe-1'
          }`}
        >
          <div>
            <div className='title-wrapper'>
              <h1 className={`title fw-bolder ${isFullView ? '' : 'text-center'}`}>
                {isFullView ? 'Cinema explorer' : 'C'}
              </h1>
            </div>
            <div className='d-flex flex-column mt-4'>
              <div className='d-flex w-100'>
                <NavLink
                  className={`${isHome ? 'selected' : ''} link rounded ${
                    isFullView ? 'w-100 p-1' : 'ms-1'
                  } mt-1`}
                  to={`${pageConfig.home}?language=${getLanguageFromParams()}`}
                >
                  {isFullView ? (
                    'Home'
                  ) : (
                    <OverlayTrigger overlay={<Tooltip>Home</Tooltip>} placement={'right'}>
                      <img
                        className='object-fit-contain link-img p-1 rounded'
                        src='/images/home.png'
                        alt='icon'
                      />
                    </OverlayTrigger>
                  )}
                </NavLink>
              </div>
              <div className='d-flex flex-column w-100'>
                <NavLink
                  to={`${pageConfig.myMovies.favourite}?language=${getLanguageFromParams()}`}
                  className={`${isMyMovies ? 'selected' : ''} link rounded ${
                    isFullView ? 'w-100 p-1' : 'ms-1'
                  } mt-1`}
                >
                  {isFullView ? (
                    'My movies'
                  ) : (
                    <OverlayTrigger overlay={<Tooltip>My movies</Tooltip>} placement={'right'}>
                      <img
                        src='/images/movie.png'
                        alt='icon'
                        className='object-fit-contain link-img p-1 rounded'
                      />
                    </OverlayTrigger>
                  )}
                </NavLink>
                {isMyMovies && (
                  <div className='d-flex flex-column'>
                    <NavLink
                      className={`${
                        isFavourite ? 'selected' : ''
                      } sub-link link rounded w-75 p-1 mt-1`}
                      to={`${pageConfig.myMovies.favourite}?language=${getLanguageFromParams()}`}
                    >
                      {isFullView ? 'Favourites' : 'F'}
                    </NavLink>
                    <NavLink
                      className={`${
                        !isFavourite ? 'selected' : ''
                      } sub-link link rounded w-75 p-1 mt-1`}
                      to={`${pageConfig.myMovies.watchlist}?language=${getLanguageFromParams()}`}
                    >
                      {isFullView ? 'Watchlist' : 'W'}
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className='user d-flex flex-row align-items-center justify-content-start flex-wrap'
            onClick={() => setShouldShowLogoutWindow(true)}
          >
            {userImage ? (
              <img
                src={userImage}
                alt='user-icon'
                className='user-img object-fit-cover rounded-circle'
              />
            ) : (
              <div className='user-img rounded-circle d-flex justify-content-center align-items-center'>
                <p className='m-0 fs-2 text-white'>{user?.username.slice(0, 1).toUpperCase()}</p>
              </div>
            )}
            {isFullView && <p className='m-0 ms-1 username'>{user?.username}</p>}
          </div>
        </div>
      </>
    );
  }
}

export default connector(SideBar);
