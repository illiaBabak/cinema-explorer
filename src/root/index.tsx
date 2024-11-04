import { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from 'src/pages/LoginPage';
import { MainPage } from 'src/pages/MainPage';
import { RedirectPage } from 'src/pages/RedirectPage';
import { StartPage } from 'src/pages/StartPage';

export class App extends Component {
  render(): JSX.Element {
    return (
      <div className='container'>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={StartPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/home' component={MainPage} />
            <Route path='/redirect' component={RedirectPage} />
            <Route path='*'>
              <Redirect to='/redirect' />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
