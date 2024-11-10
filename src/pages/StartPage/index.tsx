import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { pageConfig } from 'src/config/pages';

export class StartPage extends Component {
  render(): JSX.Element {
    return (
      <div className='start-page d-flex flex-column justify-content-center align-items-center w-100 h-100'>
        <div className='title-wrapper'>
          <h1 className='mb-4 title fw-bolder'>Cinema explorer</h1>
        </div>
        <p className='w-50 text-center'>
          Cinema Explorer is a movie discovery platform where users can browse film reviews, view
          ratings, and explore upcoming releases. It offers detailed insights into each movie,
          recommendations, making it easy to find what to watch next.
        </p>
        <p className='mt-2 fw-bolder'>To use our service, please login with your TMDB account</p>
        <NavLink
          className='login-btn d-flex justify-content-center align-items-center rounded mt-3'
          to={pageConfig.login}
        >
          Login
        </NavLink>
      </div>
    );
  }
}
