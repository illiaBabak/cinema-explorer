import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { AppViewAction, appViewSetTheme } from 'src/actions/appViewActions';
import { AppViewInitialStateType } from 'src/reducers/appViewReducer';

const mapStateToProps = (state: { appView: AppViewInitialStateType }) => ({
  isLightTheme: state.appView.isLightTheme,
});

const mapDispatchToProps = (dispatch: Dispatch<AppViewAction>) => ({
  setIsLightTheme: (isLightTheme: boolean) => dispatch(appViewSetTheme(isLightTheme)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class ThemeBtn extends Component<ConnectedProps<typeof connector>> {
  handleSwitchTheme = () => {
    const { setIsLightTheme, isLightTheme } = this.props;

    setIsLightTheme(!isLightTheme);
    localStorage.setItem('is_light_theme_cinema', JSON.stringify(!isLightTheme));
  };

  render(): JSX.Element {
    return (
      <label className='switch d-block position-relative theme-btn'>
        <input
          checked={!this.props.isLightTheme}
          type='checkbox'
          onChange={this.handleSwitchTheme}
        />
        <span className='slider position-absolute' />
      </label>
    );
  }
}

export default connector(ThemeBtn);
