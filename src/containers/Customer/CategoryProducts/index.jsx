import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { Grid, Container } from '@material-ui/core';
import ProductCard from '../../../components/ProductCard';
import classes from './index.module.css';
import Spinner from '../../../components/UI/Spinner';

export class CategoryProducts extends Component {

  componentDidMount() {
    if (this.props.currentPage === 0) {
      this.props.resetAndFetchProducts(this.props.match.params['id'], 1);
    }
    document.addEventListener('scroll', this.trackScrolling);
  }

  componentDidUpdate() {
    if (!this.props.loading && +this.props.currentCategoryId !== +this.props.match.params['id']) {
      this.props.resetAndFetchProducts(this.props.match.params['id'], 1);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementsByClassName(classes.CategoryProducts)[0];
    if (this.props.hasNextPage && !this.props.loading && this.isBottom(wrappedElement)) {
      this.props.fetchProducts(this.props.match.params['id'], this.props.currentPage + 1);      
    }
  }

  isBottom = (el) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  renderProducts = () => {
    return this.props.products.map(product => (
      <Grid item xs={3} key={`product-${product.id}`}>
        <ProductCard product={product} />
      </Grid>
    ));
  }

  render() {
    return (
      <Container classes={{root: classes.CategoryProducts}}>
        {this.props.loading && <Spinner />}
        <Grid container spacing={3}>
          {this.renderProducts()}
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.products,
  hasNextPage: state.products.hasNextPage,
  currentPage: state.products.currentPage,
  loading: state.products.loading,
  currentCategoryId: state.products.categoryId,
  authenticated: state.auth.user !== null,
});

const mapDispatchToProps = dispatch => ({
  resetAndFetchProducts: (categoryId, productId) => dispatch(actions.resetAndFetchProducts(categoryId, productId)),
  fetchProducts: (categoryId, productId) => dispatch(actions.fetchProducts(categoryId, productId)),
  resetProducts: () => dispatch(actions.resetProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProducts)