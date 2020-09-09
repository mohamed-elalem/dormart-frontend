import React from 'react';
import CloseIcon from '@material-ui/icons/Close'
import classes from './index.module.css';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

export const NavigationToolbar = (props) => (
  <div className={classes.NavigationToolbar}>
    <div>
      <MeetingRoomIcon fontSize="large" style={{color: "yellow"}} />
    </div>
    <div onClick={props.onClose} className={classes.CloseIcon}>
      <CloseIcon style={{color: "white"}} />
    </div>
  </div>
);

export default NavigationToolbar;