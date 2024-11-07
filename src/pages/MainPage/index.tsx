import { Component } from 'react';
import { Header } from 'src/components/Header';
import SideBar from 'src/components/SideBar';

export class MainPage extends Component {
  render(): JSX.Element {
    return (
      <div className='main-page d-flex flex-row justify-content-start w-100 h-100'>
        <SideBar />
        <div className='d-flex flex-column justify-content-start align-items-center content h-100'>
          <Header />
        </div>
      </div>
    );
  }
}
