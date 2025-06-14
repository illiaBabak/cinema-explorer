import { Component, JSX } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { pageConfig } from 'src/config/pages';
import FavouritePage from 'src/pages/FavouritePage';
import LoginPage from 'src/pages/LoginPage';
import MainPage from 'src/pages/MainPage';
import MoviePage from 'src/pages/MoviePage';
import { RedirectPage } from 'src/pages/RedirectPage';
import { StartPage } from 'src/pages/StartPage';
import WatchlistPage from 'src/pages/WatchlistPage';
import PersonPage from 'src/pages/PersonPage';
import { AppViewInitialStateType } from 'src/reducers/appViewReducer';
import { Alert } from 'src/components/Alert';

const mapStateToProps = (state: { appView: AppViewInitialStateType }) => ({
  isLightTheme: state.appView.isLightTheme,
});

const connector = connect(mapStateToProps);

class App extends Component<ConnectedProps<typeof connector>> {
  isInitialized = true;

  state = {
    alertText: new URLSearchParams(window.location.search).get('alert'),
    showAlert: !!new URLSearchParams(window.location.search).get('alert'),
    timeoutId: 0,
  };

  startAlertTimer = (): void => {
    const timeoutId = setTimeout(() => {
      this.setState({ showAlert: false });
    }, 5000);

    this.setState({ timeoutId });
  };

  handleMouseEnter = (): void => {
    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId);
      this.setState({ timeoutId: null });
    }
  };

  handleMouseLeave = (): void => {
    this.startAlertTimer();
  };

  switchColors = () => {
    const { isLightTheme } = this.props;
    const { body } = document;

    body.style.setProperty('--main', isLightTheme ? '#fff' : '#202020');
    body.style.setProperty('--text', isLightTheme ? '#101010' : '#fff');
    body.style.setProperty('--card', isLightTheme ? '#fff' : '#232323');
    body.style.setProperty('--input', isLightTheme ? '#fff' : '#363636');
    body.style.setProperty('--border', isLightTheme ? '#fc00ff' : '#626262');
    body.style.setProperty('--border-active', isLightTheme ? '#00dbde' : '#999999');
    body.style.setProperty(
      '--gradient',
      isLightTheme
        ? 'linear-gradient(90deg, #00dbde 0%, #fc00ff 100%)'
        : 'linear-gradient(90deg, #808080, #505050)'
    );
  };

  componentDidUpdate(): void {
    this.switchColors();
  }

  componentDidMount(): void {
    if (!this.isInitialized) return;

    this.isInitialized = false;

    this.switchColors();
  }

  render(): JSX.Element {
    const {
      start,
      login,
      redirect,
      home,
      myMovies: { favourite, watchlist },
      movie,
      person,
    } = pageConfig;

    return (
      <div className='main-container m-0 p-0 d-flex'>
        <BrowserRouter>
          <Switch>
            <Route exact path={start} component={StartPage} />
            <Route path={login} component={LoginPage} />
            <Route path={home} component={MainPage} />
            <Route path={redirect} component={RedirectPage} />
            <Route exact path='/my-movies'>
              <Redirect to={favourite} />
            </Route>
            <Route exact path={favourite} component={FavouritePage} />
            <Route exact path={watchlist} component={WatchlistPage} />
            <Route path={movie} component={MoviePage} />
            <Route path={person} component={PersonPage} />
            <Route path='*'>
              <Redirect to={pageConfig.redirect} />
            </Route>
          </Switch>
        </BrowserRouter>

        {!!this.state.showAlert && !!this.state.alertText && (
          <Alert
            text={this.state.alertText}
            type='error'
            position='top'
            onClose={() => this.setState({ showAlert: false })}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          />
        )}
      </div>
    );
  }
}

export default connector(App);
