import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { pageConfig } from 'src/config/pages';
import FavouritePage from 'src/pages/FavouritePage';
import LoginPage from 'src/pages/LoginPage';
import MainPage from 'src/pages/MainPage';
import { RedirectPage } from 'src/pages/RedirectPage';
import { StartPage } from 'src/pages/StartPage';
import WatchlistPage from 'src/pages/WatchlistPage';
import { PageInitialStateType } from 'src/reducers/pageReducer';

const mapStateToProps = (state: { page: PageInitialStateType }) => ({
  isLightTheme: state.page.isLightTheme,
});

const connector = connect(mapStateToProps);

class App extends Component<ConnectedProps<typeof connector>> {
  isInitialized = true;

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
    } = pageConfig;

    return (
      <div className='main-container m-0 p-0'>
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
            <Route path='*'>
              <Redirect to={pageConfig.redirect} />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connector(App);
