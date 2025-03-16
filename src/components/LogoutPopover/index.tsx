import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { UserAction, userShouldShowLogoutPopover } from 'src/actions/userActions';
import { deleteSessionId } from 'src/api/login';
import { pageConfig } from 'src/config/pages';
import { LoginInitialStateType } from 'src/reducers/loginReducer';
import ClickAwayListener from 'react-click-away-listener';

type Props = {
  isFullView: boolean;
} & ConnectedProps<typeof connector>;

const mapStateToProps = (state: { login: LoginInitialStateType }) => ({
  sessionId: state.login.sessionId,
});

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  setShouldShowLogoutPopover: (shouldShowWindow: boolean) =>
    dispatch(userShouldShowLogoutPopover(shouldShowWindow)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class LogoutPopover extends Component<Props> {
  handleLogout = () => {
    if (!this.props.sessionId) return;

    deleteSessionId(this.props.sessionId);
    sessionStorage.removeItem('sessionId');
    window.location.href = pageConfig.start;
  };

  render(): JSX.Element {
    const { isFullView } = this.props;

    return (
      <ClickAwayListener onClickAway={() => this.props.setShouldShowLogoutPopover(false)}>
        <div
          className={`popover ${
            isFullView ? 'full-view' : 'shorter-view'
          } position-absolute p-1 d-flex justify-content-center flex-column align-items-center rounded`}
        >
          <div
            className='logout-btn rounded d-flex justify-content-center align-items-center'
            onClick={this.handleLogout}
          >
            Logout
          </div>
        </div>
      </ClickAwayListener>
    );
  }
}

export default connector(LogoutPopover);
