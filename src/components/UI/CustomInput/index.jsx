import React from 'react';
import style from './index.module.css';
import TextField from '@material-ui/core/TextField';
import propTypes from 'prop-types';
 
function randomId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const Input = props => {
  const id = randomId();
  return (
    <div className={style.Input}>
      <TextField id={id} {...props} />
    </div>
  );
};

Input.propTypes = {
  label: propTypes.string.isRequired,
};

export default Input;