import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import LoginForm from '../../components/loginForm'

class Login extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <LoginForm />
        </Row>
      </Grid>
    );
  }
}

export default Login;
