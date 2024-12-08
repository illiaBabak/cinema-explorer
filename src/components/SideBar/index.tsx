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

const mapStateToProps = (state: { login: LoginInitialState; user: UserInitialStateType }) => ({
  sessionId: state.login.sessionId,
  user: state.user.user,
  shouldShowLogoutWindow: state.user.shouldShowLogoutWindow,
});

const mapDispatchToProps = (dispatch: Dispatch<LoginAction | UserAction>) => ({
  setSessionId: (sessionId: string) => dispatch(loginSetSessionId(sessionId)),
  setUserInfo: (userInfo: User) => dispatch(userSetInfo(userInfo)),
  setShouldShowLogoutWindow: (shouldShow: boolean) =>
    dispatch(userShouldShowLogoutWindow(shouldShow)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class SideBar extends Component<ConnectedProps<typeof connector>> {
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
    const { user, setShouldShowLogoutWindow, shouldShowLogoutWindow } = this.props;
    const { pathname } = window.location;

    const userImage = this.getUserImg();

    const isHome = pathname.includes('home');
    const isMyMovies = pathname.includes('my-movies');
    const isFavourite = pathname.includes('favourite');

    return (
      <>
        {shouldShowLogoutWindow && <LogoutWindow />}
        <div className='sidebar d-flex flex-column justify-content-between align-items-start h-100 py-4 px-2'>
          <div>
            <div className='title-wrapper'>
              <h1 className='title fw-bolder'>Cinema explorer</h1>
            </div>
            <div className='d-flex flex-column mt-4'>
              <div className='d-flex w-100'>
                <NavLink
                  className={`${isHome ? 'selected' : ''} link rounded w-100 p-1 mt-1`}
                  to={pageConfig.home}
                >
                  Home
                </NavLink>
              </div>
              <div className='d-flex flex-column w-100'>
                <NavLink
                  to={pageConfig.myMovies.favourite}
                  className={`${isMyMovies ? 'selected' : ''} link rounded w-100 p-1 mt-1`}
                >
                  My movies
                </NavLink>
                {isMyMovies && (
                  <div className='d-flex flex-column'>
                    <NavLink
                      className={`${
                        isFavourite ? 'selected' : ''
                      } sub-link link rounded w-75 p-1 mt-1`}
                      to={pageConfig.myMovies.favourite}
                    >
                      Favourites
                    </NavLink>
                    <NavLink
                      className={`${
                        !isFavourite ? 'selected' : ''
                      } sub-link link rounded w-75 p-1 mt-1`}
                      to={pageConfig.myMovies.watchlist}
                    >
                      Watchlist
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

            <p className='m-0 ms-1 username'>{user?.username}</p>
          </div>
        </div>
      </>
    );
  }
}

export default connector(SideBar);
