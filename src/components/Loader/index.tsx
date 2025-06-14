import { Component, JSX } from 'react';

export class Loader extends Component {
  render(): JSX.Element {
    return <div className='loader position-fixed' />;
  }
}
