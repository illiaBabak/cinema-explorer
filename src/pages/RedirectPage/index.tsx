import { Component } from 'react';
import { NavLink } from 'react-router-dom';

export class RedirectPage extends Component {
  render(): JSX.Element {
    return (
      <div className='w-100 h-100 d-flex justify-content-center align-items-center flex-column redirect-page'>
        <h1>Oops, something went wrong...</h1>
        <NavLink
          className='link-btn d-flex justify-content-center align-items-center rounded mt-4'
          to='/'
        >
          Start page
        </NavLink>
      </div>
    );
  }
}
