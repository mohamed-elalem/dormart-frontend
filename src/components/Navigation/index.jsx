import React from 'react';
import NavigationItems from './NavigationItems';
import NavigationToolbar from './NavigationToolbar';
import classes from './index.module.css';
export const Navigation = (props) => (
  <div className={classes.Navigation}>
    <NavigationToolbar onClose={props.onClose} />
    <NavigationItems items={props.items} onClose={props.onClose} />
  </div>
);

export default Navigation;