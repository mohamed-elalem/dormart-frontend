import React, { Component } from 'react';
import { SwipeableDrawer } from '@material-ui/core';
import classes from './index.module.css';
import Navigation from '../../components/Navigation';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Toolbar from '../../components/Toolbar';
import AccountNavigation from '../../components/Navigation/AccountNavigation';
import { Route, Switch } from 'react-router-dom';
import Login from '../User/Login';
import GuestGuard from '../../hoc/GuestGuard';
import Register from '../User/Register';
import Spinner from '../../components/UI/Spinner';
import CategoryProducts from '../Customer/CategoryProducts';
import CustomerProduct from '../Customer/CustomerProduct';

export class Layout extends Component {
  state = {
    categoryDrawerOpen: false,
    accountDrawerOpen: false,
  }

  onDrawerToggleHandler = drawerStateKey => () => {
    this.setState(prevState => ({ [drawerStateKey]: !prevState[drawerStateKey] }));
  }
  componentDidMount() {
    this.props.fetchCategories();
    const token = localStorage.getItem('token');
    if (token) {
      this.props.autoLogin(token);
    }
  }

  render() {
    let navigation = null;
    if (this.props.categories) {
      const navigationItems = this.props.categories.map(category => {
        return {
          name: category.name,
          link: `/categories/${category.id}/products`,
          key: `categories-${category.id}-products`,
        }
      });

      navigation = (
        <Navigation onClose={this.onDrawerToggleHandler('categoryDrawerOpen')} items={navigationItems} />
      );
    }

    return (
      <React.Fragment>
        {this.props.loading ? <Spinner /> : null}
        <Toolbar
          onOpenCategoryDrawer={this.onDrawerToggleHandler('categoryDrawerOpen')}
          onOpenAccountDrawer={this.onDrawerToggleHandler('accountDrawerOpen')}
        />
        <SwipeableDrawer
          onClose={this.onDrawerToggleHandler('categoryDrawerOpen')}
          open={this.state.categoryDrawerOpen}
          anchor="left"
          onOpen={this.onDrawerToggleHandler('categoryDrawerOpen')}>
          {navigation}
        </SwipeableDrawer>

        <SwipeableDrawer
          onClose={this.onDrawerToggleHandler('accountDrawerOpen')}
          open={this.state.accountDrawerOpen}
          anchor="right"
          onOpen={this.onDrawerToggleHandler('accountDrawerOpen')}>
            <AccountNavigation
              onClose={this.onDrawerToggleHandler('accountDrawerOpen')}
              authenticated={this.props.authenticated}
              logout={this.props.logout} />
        </SwipeableDrawer>

        <div className={classes.Content}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/categories/:categoryId/products/:productId" component={CustomerProduct} />
              <Route path="/categories/:id/products" component={CategoryProducts} />
            </Switch>

        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
  loadingCategories: state.categories.fetchingCategories,
  authenticated: state.auth.user !== null,
  loading: state.auth.fetching,
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(actions.fetchCategories()),
  autoLogin: (token) => dispatch(actions.authenticateUserByToken(token)),
  logout: () => dispatch(actions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);