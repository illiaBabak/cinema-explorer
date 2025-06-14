import { Component, JSX } from 'react';
import { NavLink } from 'react-router-dom';
import LanguageDropdown from 'src/components/LanguageDrodown';
import ThemeBtn from 'src/components/ThemeBtn';
import { pageConfig } from 'src/config/pages';
import { getLanguageFromParams } from 'src/utils/getLanguageFromParams';

export class StartPage extends Component {
  render(): JSX.Element {
    return (
      <div className='start-page d-flex flex-column w-100 h-100 p-3'>
        <div className='d-flex flex-row w-100 justify-content-between'>
          <LanguageDropdown />
          <ThemeBtn />
        </div>

        <div className='d-flex jusfity-content-center align-items-center flex-column align-self-center m-auto'>
          <div className='title-wrapper'>
            <h1 className='mb-4 title fw-bolder'>Cinema explorer</h1>
          </div>
          <p className='w-50 text-center text'>
            Cinema Explorer is a movie discovery platform where users can browse film reviews, view
            ratings, and explore upcoming releases. It offers detailed insights into each movie,
            recommendations, making it easy to find what to watch next.
          </p>
          <p className='mt-2 fw-bolder text'>
            To use our service, please login with your TMDB account
          </p>
          <NavLink
            className='login-btn d-flex justify-content-center align-items-center rounded mt-3 text-white'
            to={`${pageConfig.login}?language=${getLanguageFromParams()}`}
          >
            Login
          </NavLink>
        </div>
      </div>
    );
  }
}
