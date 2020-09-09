import React, { useEffect, useState } from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

export const FlashMessage = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, [setOpen]);

  const onClose = () => {
    setOpen(false);
  }

  return (
    <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={10000}
        onClose={onClose}
        message={props.message}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
  );
};

FlashMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default FlashMessage;