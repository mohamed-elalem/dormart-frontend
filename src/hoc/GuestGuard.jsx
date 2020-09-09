import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

export const GuestGuard = props => {
  useEffect(() => {
    const redirectUrl = props.redirectUrl || '/';
    if (props.authenticated && redirectUrl !== props.location.pathname) {
      props.history.push(redirectUrl);
    }
  }, [props.authenticated, props.location, props.redirectUrl, props.history]);

  return props.children
};

const mapStateToProps = state => ({
  authenticated: state.auth.user !== null,
  redirectUrl: state.auth.redirectUrl,
});

export default withRouter(connect(mapStateToProps)(GuestGuard));