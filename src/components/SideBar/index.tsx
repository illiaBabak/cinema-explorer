import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { LoginAction, loginSetSessionId } from 'src/actions/loginActions';
import { UserAction, userSetInfo } from 'src/actions/userActions';
import { getUser } from 'src/api/user';
import { LoginInitialState } from 'src/reducers/loginReducer';
import { UserInitialStateType } from 'src/reducers/userReducer';
import { User } from 'src/types';
import { isString } from 'src/utils/guards';

const mapStateToProps = (state: { login: LoginInitialState; user: UserInitialStateType }) => ({
  sessionId: state.login.sessionId,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: Dispatch<LoginAction | UserAction>) => ({
  setSessionId: (sessionId: string) => dispatch(loginSetSessionId(sessionId)),
  setUserInfo: (userInfo: User) => dispatch(userSetInfo(userInfo)),
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
      window.location.href = '/redirect';
      return;
    }

    this.props.setSessionId(sessionId);
    this.getUserInfo(sessionId);
    this.isInitialized = true;
  }

  render(): JSX.Element {
    const { user } = this.props;
    const userImage = this.getUserImg();

    return (
      <div className='sidebar d-flex flex-column justify-content-between align-items-between h-100 py-4 px-3'>
        <div className='title-wrapper'>
          <h1 className='title fw-bolder'>Cinema explorer</h1>
        </div>
        <div className='user d-flex flex-row align-items-center'>
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
      </div>
    );
  }
}

export default connector(SideBar);
