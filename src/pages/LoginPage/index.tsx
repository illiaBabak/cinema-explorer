import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import {
  LoginAction,
  loginSetName,
  loginSetPassword,
  loginSetSessionId,
} from 'src/actions/loginActions';
import { LoginInitialState } from 'src/reducers/loginReducer';
import { getSessionId } from 'src/utils/login';

const mapStateToProps = (state: { login: LoginInitialState }) => ({
  name: state.login.name,
  password: state.login.password,
});

const mapDispatchToProps = (dispatch: Dispatch<LoginAction>) => ({
  setName: (val: string) => dispatch(loginSetName(val)),
  setPassword: (val: string) => dispatch(loginSetPassword(val)),
  setSessionId: (sessionId: string | null) => dispatch(loginSetSessionId(sessionId)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class LoginPage extends Component<ConnectedProps<typeof connector>> {
  login = async (): Promise<void> => {
    const { name, password } = this.props;

    if (!name || !password) return;

    const sessionId = await getSessionId(name, password);

    this.props.setSessionId(sessionId);

    if (sessionId) window.location.href = '/home';
  };

  render(): JSX.Element {
    const { setName, setPassword } = this.props;

    return (
      <div>
        <h2>Login</h2>
        <form>
          <input type='text' onBlur={({ currentTarget: { value } }) => setName(value)} />
          <input type='password' onBlur={({ currentTarget: { value } }) => setPassword(value)} />
          <input type='button' onClick={this.login} />
        </form>
      </div>
    );
  }
}

export default connector(LoginPage);
