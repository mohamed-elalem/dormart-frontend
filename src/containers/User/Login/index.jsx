import React from 'react';
import {useFormik} from 'formik';
import CustomInput from '../../../components/UI/CustomInput';
import { Button, Container, Paper, Typography } from '@material-ui/core';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../../components/UI/Spinner';
import classes from './index.module.css';
import { Alert, AlertTitle } from '@material-ui/lab';
import withGuestGuard from '../../../hoc/withGuestGuard';


export const Login = (props) => {

  const onSubmit = values => {
    props.authenticateUser(values.email, values.password);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
  });

  let spinner = null;
  let loginDivClasses = [classes.Login];
  if (props.fetching) {
    spinner = (
      <div className={classes.Spinner}>
        <Spinner />
      </div>
    );
    loginDivClasses.push(classes.Blurred);
  }

  return (
    <Container maxWidth="md" style={{height: '100%'}} classes={{root: classes.Container}}>
      <div className={loginDivClasses.join(' ')}>
        {spinner}
          <Paper elevation={10} style={{height: '40vh', padding: '25px'}} classes={{root: classes.Paper}}>
            {props.error && 
            <Alert severity="error" style={{marginBottom: '15px'}}>
              <AlertTitle>
                <Typography>
                  {props.error}
                </Typography>
              </AlertTitle>
            </Alert> }
            <form onSubmit={formik.handleSubmit}>
              <CustomInput
                label="Email"
                type="email"
                name="email"
                placeholder="john.doe@example.com"
                value={formik.values.email}
                onChange={formik.handleChange} />
              <CustomInput
                label="Password"
                type="password"
                placeholder="*********"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange} />
              <Button type="submit" color="primary">Login</Button>
            </form>
          </Paper>
        </div>
      </Container>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  error: state.auth.error,
  fetching: state.auth.fetching,
});

const mapDispatchToProps = dispatch => ({
  authenticateUser: (email, password) => dispatch(actions.authenticateUser(email, password)),
});

export default withGuestGuard(connect(mapStateToProps, mapDispatchToProps)(Login));