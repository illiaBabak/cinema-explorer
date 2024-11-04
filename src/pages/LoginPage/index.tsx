import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import {
  LoginAction,
  loginSetError,
  loginSetName,
  loginSetPassword,
  loginSetSessionId,
} from 'src/actions/loginActions';
import { LoginInitialState } from 'src/reducers/loginReducer';
import { getSessionId } from 'src/utils/login';

const mapStateToProps = (state: { login: LoginInitialState }) => ({
  name: state.login.name,
  password: state.login.password,
  error: state.login.error,
});

const mapDispatchToProps = (dispatch: Dispatch<LoginAction>) => ({
  setName: (val: string) => dispatch(loginSetName(val)),
  setPassword: (val: string) => dispatch(loginSetPassword(val)),
  setSessionId: (sessionId: string | null) => dispatch(loginSetSessionId(sessionId)),
  setError: (error: string | undefined) => dispatch(loginSetError(error)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class LoginPage extends Component<ConnectedProps<typeof connector>> {
  login = async (): Promise<void> => {
    const { name, password } = this.props;

    if (!name || !password) return;

    const { data: sessionId, error } = await getSessionId(name, password);

    this.props.setError(error);

    if (sessionId) {
      this.props.setSessionId(sessionId);
      window.location.href = '/home';
    }
  };

  render(): JSX.Element {
    const { setName, setPassword, error } = this.props;

    return (
      <div>
        <h2>Login</h2>
        <form>
          <input type='text' onBlur={({ currentTarget: { value } }) => setName(value)} />
          <input type='password' onBlur={({ currentTarget: { value } }) => setPassword(value)} />
          <input type='button' onClick={this.login} />
          {error && <p>{error}</p>}
        </form>
      </div>
    );
  }
}

export default connector(LoginPage);
