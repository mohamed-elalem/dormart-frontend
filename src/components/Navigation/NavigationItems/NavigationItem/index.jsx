import React from 'react';
import classes from './index.module.css';

export const NavigationItem = props => (
  <div className={classes.NavigationItem}>
    {props.children}
  </div>
);

export default NavigationItem;