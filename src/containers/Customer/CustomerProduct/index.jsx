import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../components/UI/Spinner';
import * as actions from '../../../store/actions';
import BreadCrumb from '../../../components/UI/BreadCrumb';
import { Grid, Typography, Button, Box, Select, MenuItem, FormControl, GridListTile, GridList } from '@material-ui/core';
import classes from './index.module.css';
import { useFormik } from 'formik';
import CustomInput from '../../../components/UI/CustomInput';
import ReactImageGallery from 'react-image-gallery';
import ReviewsList from "../../../components/ReviewsList";

export const CustomerProduct = (props) => {
  const { fetchProduct, fetchReviews, match: { params: { categoryId, productId } } } = props;

  useEffect(() => {
    fetchProduct(categoryId, productId);
  }, [fetchProduct, categoryId, productId]);


  useEffect(() => {
    fetchReviews(productId, 1);
  }, [fetchReviews, productId]);
  
  const onSubmit = values => {
    if (!props.authenticated) {
      props.restrictedRoute(props.location.pathname);
      props.history.push('/login');
    }
  }

  const formik = useFormik({
    initialValues: {
      quantity: 1
    },
    onSubmit
  });

  const fetchReviewsPage = page => {
    fetchReviews(productId, page);
  }

  let links = [];
  if (props.product) {
    const currentPathTokens = props.location.pathname.split('/');
    currentPathTokens.splice(-1, 1);

    links = [
      {
        name: props.product.category.name,
        url: currentPathTokens.join('/'),
      },
    ];
  }

  let productJSX = <Spinner />;
  if (props.product) {
    productJSX = (
      <React.Fragment>
        <Box variant="div" mb={3}>
          <BreadCrumb links={links} endText={props.product.name} />
        </Box>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <ReactImageGallery items={props.product.pictures.map(picture => ({original: picture, thumbnail: picture}))} />
            </Grid>
            <Grid item xs={6}>
              <div className={classes.ProductTitle}>
                <Typography variant="h4">
                  {props.product.name}
                </Typography>
              </div>
              <div className={classes.ProductPrice}>
                <Typography variant="h4">
                  ${parseFloat(props.product.price).toFixed(2)}
                </Typography>
              </div>
              <div className={classes.AddToCart}>
                <form onSubmit={formik.handleSubmit}>
                  <FormControl classes={{root: classes.FormControl}}>
                    <Select
                      onChange={formik.handleChange}
                      value={formik.values.quantity}
                      onSubmit={onSubmit}
                      name="quantity"
                      autoWidth>
                      {Array(props.product.quantity).fill(1).map((_, index) => (
                        <MenuItem value={index + 1} key={index}>{index + 1}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button color="primary" variant="contained" type="submit">Add to cart</Button>
                </form>
              </div>
            </Grid>
          </Grid>
          <hr />
          <Typography variant="h4" component="p" align="center">
            Reviews
          </Typography>
          <Grid container alignItems="center">
            <ReviewsList
              reviews={props.reviews}
              totalPages={props.reviewsTotalPages}
              fetchReviews={fetchReviewsPage}
              loading={props.reviewsLoading}
            />
          </Grid>
        </div>
      </React.Fragment>
    );
  }

  return productJSX;
};

const mapStateToProps = state => ({
  product: state.products.product,
  fetching: state.products.loading,
  reviews: state.reviews.reviews,
  reviewsTotalPages: state.reviews.totalPages,
  reviewsLoading: state.reviews.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchProduct: (categoryId, productId) => dispatch(actions.fetchSingleProduct(categoryId, productId)),
  fetchReviews: (productId, page) => dispatch(actions.fetchReviews(productId, page)),
  restrictedRoute: redirectUrl => dispatch(actions.restrictedRoute(redirectUrl)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProduct);