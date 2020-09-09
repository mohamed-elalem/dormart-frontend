import React from 'react';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import {Avatar, Typography} from "@material-ui/core";
import ListItemText from '@material-ui/core/ListItemText';
import Rating from "@material-ui/lab/Rating";

export const Review = ({ review }) => {
  return (
    <React.Fragment>
        <ListItemAvatar>
            <Avatar alt={review.customer.name} src={review.customer.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={review.title}
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                {review.customer.name}
              </Typography>
              <br />
              <Rating
                value={review.rate.value}
                readOnly
                size="small" />
              <br />
              <Typography component="span" variant="body1" color="textSecondary">
                {review.content}
              </Typography>
            </React.Fragment>
          }
          color="textPrimary"
          />

    </React.Fragment>
  );
};

export default Review;