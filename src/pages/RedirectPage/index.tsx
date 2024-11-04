import { Component } from 'react';
import { NavLink } from 'react-router-dom';

export class RedirectPage extends Component {
  render(): JSX.Element {
    return (
      <div>
        <h2>Ooops, something went wrong...</h2>
        <NavLink to='/'>Start page</NavLink>
      </div>
    );
  }
}
