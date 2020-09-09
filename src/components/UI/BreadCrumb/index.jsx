import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@material-ui/core';
import classes from './index.module.css';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PropTypes from 'prop-types';

const breadCrumbLinks = links => {
  return links.map((link, index) => (
    <Link color="inherit" className={classes.Link} key={index} to={link.url}>
      {link.name}
    </Link>
  ))
}

export const BreadCrumb = props => (
  <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
    <Link className={classes.Link} color="inherit" to="/">
      Home
    </Link>

    {breadCrumbLinks(props.links)}
    { props.endText && <Typography color="textPrimary">{props.endText}</Typography> }
  </Breadcrumbs>
);

BreadCrumb.defaultProps = {
  links: [],
};

BreadCrumb.propTypes = {
  links: PropTypes.array
};

export default BreadCrumb;