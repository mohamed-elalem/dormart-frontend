import React from 'react';
import { SupervisedUserCircle, CloseOutlined } from  '@material-ui/icons';
import { connect } from 'react-redux';
import classes from './index.module.css';
import { Avatar, Typography } from '@material-ui/core';

const renderUserInfo = user => {
  if (user) {
    return (
      <div className={classes.UserInfo}>
        <Avatar alt={user.name} src={user.avatar} />
        <Typography component="span" style={{marginLeft: '5px'}} variant="subtitle2">
          {user.name}
        </Typography>
      </div>
    );
  } else {
    return (
      <SupervisedUserCircle fontSize="large" color="primary" />
    );
  }
};

export const AccountNavigationToolbar = (props) => (
  <div className={classes.AccountNavigationToolbar}>
    <div>
      {renderUserInfo(props.user)}
    </div>
    <div onClick={props.onClose} className={classes.CloseIcon}>
      <CloseOutlined color="action" />
    </div>
  </div>
);

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(AccountNavigationToolbar);