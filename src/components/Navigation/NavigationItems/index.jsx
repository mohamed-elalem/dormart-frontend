import React from 'react';
import NavigationItem from './NavigationItem';
import classes from './index.module.css';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
export const NavigationItems = (props) => {
  const renderNavigationItems = (items) => {
    return items.map(({name, link, key}) => {
      return (
        <NavigationItem key={key}>
          <Link to={link}>
            <Typography>
              {name}
            </Typography>
          </Link>
        </NavigationItem>
      )
    });
  }
  return (
    <div className={classes.NavigationItems} onClick={props.onClose}>
      {renderNavigationItems(props.items)}
    </div>
  );
};

export default NavigationItems;