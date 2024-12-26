import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import {
  LoginAction,
  loginSetError,
  loginSetIsLoading,
  loginSetName,
  loginSetPassword,
  loginSetSessionId,
  loginSetShowPassword,
} from 'src/actions/loginActions';
import { Loader } from 'src/components/Loader';
import { LoginInitialState } from 'src/reducers/loginReducer';
import { getSessionId } from 'src/api/login';
import { pageConfig } from 'src/config/pages';
import ThemeBtn from 'src/components/ThemeBtn';
import LanguageDrodown from 'src/components/LanguageDrodown';
import { getLanguageFromParams } from 'src/utils/getLanguageFromParams';

const mapStateToProps = (state: { login: LoginInitialState }) => ({
  name: state.login.name,
  password: state.login.password,
  error: state.login.error,
  shouldShowPassword: state.login.shouldShowPassword,
  isLoading: state.login.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch<LoginAction>) => ({
  setName: (val: string) => dispatch(loginSetName(val)),
  setPassword: (val: string) => dispatch(loginSetPassword(val)),
  setSessionId: (sessionId: string | null) => dispatch(loginSetSessionId(sessionId)),
  setError: (error: string | undefined) => dispatch(loginSetError(error)),
  setShouldShowPassword: (val: boolean) => dispatch(loginSetShowPassword(val)),
  setIsLoading: (val: boolean) => dispatch(loginSetIsLoading(val)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class LoginPage extends Component<ConnectedProps<typeof connector>> {
  login = async (): Promise<void> => {
    const { name, password, setIsLoading } = this.props;

    if (!name || !password) return;

    setIsLoading(true);

    const { data: sessionId, error } = await getSessionId(name, password);

    setIsLoading(false);

    this.props.setError(error);

    if (sessionId) {
      this.props.setSessionId(sessionId);
      sessionStorage.setItem('sessionId', sessionId);
      window.location.href = `${pageConfig.home}?language=${getLanguageFromParams()}`;
    }
  };

  render(): JSX.Element {
    const {
      setName,
      setPassword,
      error,
      name,
      password,
      shouldShowPassword,
      setShouldShowPassword,
      isLoading,
    } = this.props;

    return (
      <div className='login-page w-100 h-100 d-flex flex-column p-3'>
        <div className='d-flex flex-row w-100 align-items-center justify-content-between'>
          <LanguageDrodown />
          <ThemeBtn />
        </div>

        <div className='form-wrapper d-flex flex-column align-self-center m-auto p-1'>
          <form className='form d-flex flex-column align-items-center justify-content-between px-4 py-3 w-100 h-100'>
            <div className='text-center'>
              <h2 className='mb-4 text'>Login</h2>
              <div className='d-flex flex-row justify-content-between align-items-center my-4 w-100 px-4 mt-4'>
                <p className='m-0 field-text text'>Username</p>
                <input
                  className='field ms-2 text'
                  type='text'
                  value={name}
                  onChange={({ currentTarget: { value } }) => setName(value)}
                />
              </div>
              <div className='d-flex flex-row justify-content-between align-items-center my-4 w-100 px-4 position-relative'>
                <p className='m-0 field-text text'>Password</p>
                <input
                  className='field ms-2 text'
                  type={shouldShowPassword ? 'text' : 'password'}
                  value={password}
                  onChange={({ currentTarget: { value } }) => setPassword(value)}
                />
                <img
                  className='password-eye rounded-circle object-fit-contain position-absolute'
                  src={shouldShowPassword ? 'images/visible_eye.png' : 'images/invisible_eye.png'}
                  alt='eye'
                  onClick={() => setShouldShowPassword(!shouldShowPassword)}
                />
              </div>
            </div>

            <div className='w-100 d-flex flex-column justify-content-center align-items-center'>
              {error && <p className='text-center error-text'>{error}</p>}
              <div
                className={`submit-btn-wrapper rounded w-75 ${
                  !name || !password ? 'disabled' : ''
                }`}
              >
                <input
                  className='submit-btn rounded w-100'
                  type='button'
                  onClick={this.login}
                  value='Submit'
                />
              </div>

              <div className='text-center mx-4 mt-3 mb-1 text'>
                Don't have a TMDB account? <br />
                <a className='link' href='https://www.themoviedb.org/signup'>
                  Create TMDB account
                </a>
              </div>
            </div>
          </form>
        </div>

        {isLoading && <Loader />}
      </div>
    );
  }
}

export default connector(LoginPage);
