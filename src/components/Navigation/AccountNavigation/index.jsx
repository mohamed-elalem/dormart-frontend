import React from 'react';
import {Typography } from '@material-ui/core';
import AccountNavigationToolbar from '../AccountNavigationToolbar';
import classes from './index.module.css';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export const AccountNavigation = (props) => {
  const guestLinks = [
    {
      key: 'login',
      to: '/login',
      text: 'Login',
      icon: <ExitToAppIcon fontSize="large" />
    },
    {
      key: 'register',
      to: '/register',
      text: 'Register',
      icon: <PersonAddIcon fontSize="large" />
    }
  ].map(link => (
    <div key={link.key} className={classes.NavigationLink}>
      {link.icon}
      <Link to={link.to}>
        <Typography>
          {link.text}
        </Typography>
      </Link>
    </div>
  ));

  const authenticatedLinks = (
    <React.Fragment>
      <div className={classes.NavigationLink} onClick={props.logout}>
        <Typography>
          Logout
        </Typography>
      </div>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <AccountNavigationToolbar onClose={props.onClose} />
      <div className={classes.AccountNavigation} onClick={props.onClose}>
        {!props.authenticated && guestLinks}
        {props.authenticated && authenticatedLinks}
      </div>
    </React.Fragment>
  );
};

export default AccountNavigation;