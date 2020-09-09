import React from 'react';
import classes from './index.module.css';
export const Spinner = () => (
  <div className={classes.SpinnerContainer}>
    <div className={classes.Spinner}>Loading...</div>
  </div>
);

export default Spinner;
