import { Component, JSX } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeBtn from 'src/components/ThemeBtn';
import { pageConfig } from 'src/config/pages';

export class RedirectPage extends Component {
  render(): JSX.Element {
    return (
      <div className='w-100 h-100 d-flex flex-column redirect-page p-2'>
        <ThemeBtn />
        <div className='d-flex justify-content-center align-items-center flex-column align-self-center m-auto'>
          <h1 className='text'>Oops, something went wrong...</h1>
          <NavLink
            className='link-btn d-flex justify-content-center align-items-center rounded mt-4 text-white'
            to={pageConfig.start}
          >
            Start page
          </NavLink>
        </div>
      </div>
    );
  }
}
