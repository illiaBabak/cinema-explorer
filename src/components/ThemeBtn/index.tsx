import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { PageAction, pageSetIsLightTheme } from 'src/actions/pageActions';
import { PageInitialStateType } from 'src/reducers/pageReducer';

const mapStateToProps = (state: { page: PageInitialStateType }) => ({
  isLightTheme: state.page.isLightTheme,
});

const mapDispatchToProps = (dispatch: Dispatch<PageAction>) => ({
  setIsLightTheme: (isLightTheme: boolean) => dispatch(pageSetIsLightTheme(isLightTheme)),
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
