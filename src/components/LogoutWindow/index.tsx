import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { UserAction, userShouldShowLogoutWindow } from 'src/actions/userActions';
import { deleteSessionId } from 'src/api/login';
import { pageConfig } from 'src/config/pages';
import { LoginInitialState } from 'src/reducers/loginReducer';
import { UserInitialStateType } from 'src/reducers/userReducer';

const mapStateToProps = (state: { user: UserInitialStateType; login: LoginInitialState }) => ({
  user: state.user.user,
  sessionId: state.login.sessionId,
});

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  setShouldShowLogoutWindow: (shouldShowWindow: boolean) =>
    dispatch(userShouldShowLogoutWindow(shouldShowWindow)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class LogoutWindow extends Component<ConnectedProps<typeof connector>> {
  handleLogout = () => {
    if (!this.props.sessionId) return;

    deleteSessionId(this.props.sessionId);
    sessionStorage.removeItem('sessionId');
    window.location.href = pageConfig.start;
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

  render(): JSX.Element {
    const { setShouldShowLogoutWindow, user } = this.props;
    const userImage = this.getUserImg();

    return (
      <div
        className='wrapper position-absolute w-100 h-100 d-flex justify-content-center align-items-center'
        onClick={() => setShouldShowLogoutWindow(false)}
      >
        <div
          className='window position-relative p-4 d-flex justify-content-between flex-column align-items-center rounded'
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className='close-btn position-absolute d-flex justify-content-center align-items-center'
            onClick={() => setShouldShowLogoutWindow(false)}
          >
            x
          </div>
          <div className='user d-flex flex-row align-items-center mt-4'>
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

            <h4 className='m-0 ms-2'>{user?.username}</h4>
          </div>
          <div
            className='logout-btn rounded d-flex justify-content-center align-items-center'
            onClick={this.handleLogout}
          >
            Logout
          </div>
        </div>
      </div>
    );
  }
}

export default connector(LogoutWindow);
