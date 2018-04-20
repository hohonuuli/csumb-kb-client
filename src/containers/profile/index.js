import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import RegistrationForm from '../../components/registrationForm'

class Profile extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <RegistrationForm />
        </Row>
      </Grid>
    );
  }
}

export default Profile;
