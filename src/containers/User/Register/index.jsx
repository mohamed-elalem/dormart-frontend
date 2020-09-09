import React from 'react';
import CustomInput from '../../../components/UI/CustomInput';
import classes from './index.module.css';
import { useFormik } from 'formik';
import { Button, Paper, Container } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import Spinner from '../../../components/UI/Spinner';
import FlashMessage from '../../../components/UI/FlashMessage';



export const Register = (props) => {
  const onSubmit = values => {
    console.log(values);
    props.registerCustomer(values);
  }
  

  const formik = useFormik({
    initialValues: {
      email: '',
      email_confirmation: '',
      password: '',
      password_confirmation: '',
      name: '',
      avatar: '',
    },
    onSubmit,
  });

  return (
    <React.Fragment>
      {props.loading ? <Spinner /> : null}
      {props.user ? <FlashMessage message="Account created successfully. Please check your inbox to verify your account" /> : null}
      <Container maxWidth="md" classes={{root: classes.Container}}>
        <div className={classes.Register}>
          <Paper elevation={3} style={{padding: '20px'}}>
            <form onSubmit={formik.handleSubmit}>
              <CustomInput
                label="Name"
                type="text"
                name="name"
                placeholder="Your name"
                value={formik.values.name}
                onChange={formik.handleChange} />
              <CustomInput
                error={props.errors && props.errors['email'] !== undefined}
                helperText={props.errors && props.errors['email'] && props.errors['email'].join('<br>')}
                label="Email"
                type="email"
                name="email"
                placeholder="Your email"
                value={formik.values.email}
                onChange={formik.handleChange} />
              <CustomInput
                label="Email Confirmation"
                type="email"
                name="email_confirmation"
                placeholder="Re-enter your email"
                value={formik.values.email_confirmation}
                onChange={formik.handleChange} />
              <CustomInput
                error={props.errors && props.errors.hasOwnProperty('password')}
                helperText={props.errors && props.errors['password'] && props.errors['password'].join('<br>')}
                label="Password"
                type="password"
                name="password"
                placeholder="Enter password"
                value={formik.values.password}
                onChange={formik.handleChange} />
              <CustomInput
                label="Password Confirmation"
                type="password"
                name="password_confirmation"
                placeholder="Re-enter your password"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange} />

              <CustomInput
                label="Profile Picture"
                type="file"
                name="avatar"
                onChange={event => {
                  console.log(event.currentTarget.files);
                  formik.setFieldValue('avatar', event.currentTarget.files[0])
                }} />
              
              <Button type="submit" button="primary">Create new account</Button>
            </form>
          </Paper>
        </div>
      </Container>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  loading: state.user.loading,
  errors: state.user.error,
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  registerCustomer: (customer) => dispatch(actions.registerNewCustomer(customer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);