import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import classes from './index.module.css';
import MaterialToolbar from '@material-ui/core/Toolbar';
import { InputBase, IconButton, AppBar } from '@material-ui/core';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';

export const Toolbar = (props) => {
  return (
    <AppBar position="static">
      <MaterialToolbar classes={{root: classes.Toolbar}}>
        <IconButton
          edge="start"
          className={classes.MenuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={props.onOpenCategoryDrawer}
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.Search}>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.SearchInput
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <div className={classes.AccountSideDrawer}>
        <IconButton
          edge="start"
          className={classes.MenuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={props.onOpenAccountDrawer}
        >
          <AccountCircleSharpIcon />
        </IconButton>
        </div>
      </MaterialToolbar>
    </AppBar>
  );
};

export default Toolbar;