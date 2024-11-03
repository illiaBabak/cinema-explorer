import { Component } from 'react';
import { NavLink } from 'react-router-dom';

export class StartPage extends Component {
  render(): JSX.Element {
    return (
      <div className='start-page'>
        <h1>Cinema explorer</h1>
        <p>To use our service, please login with your TMDB account</p>
        <NavLink to='/login'>Login</NavLink>
      </div>
    );
  }
}
