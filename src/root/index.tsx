import { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from 'src/pages/LoginPage';
import { MainPage } from 'src/pages/MainPage';
import { StartPage } from 'src/pages/StartPage';

export class App extends Component {
  render(): JSX.Element {
    return (
      <div className='container'>
        <BrowserRouter>
          <Switch>
            <Route path='/start' component={StartPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/home' component={MainPage} />
            <Route>
              <Redirect to='/start' />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
