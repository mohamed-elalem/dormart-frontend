import React, { useState } from 'react';
import Review from "./Review";
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import { Pagination } from '@material-ui/lab';
import Spinner from "../UI/Spinner";
const renderReviews = reviews => reviews.map(review => (
    <ListItem key={review.id} alignItems="flex-start">
        <Review review={review} />
    </ListItem>
));
export const ReviewsList = ({ reviews, totalPages, fetchReviews, loading }) => {
  const [page, setPage] = useState(1);

  if (loading) {
    return <Spinner />
  }

  return (
      <React.Fragment>
        <List>
            {renderReviews(reviews)}
            <Pagination
              count={totalPages}
              color="secondary"
              variant="outlined"
              shape="rounded"
              page={page}
              onChange={(_, page) => {
                fetchReviews(page);
                setPage(page);
              }} />
        </List>
      </React.Fragment>
  )
};

export default ReviewsList;