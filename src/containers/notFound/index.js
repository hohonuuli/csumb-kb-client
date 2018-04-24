import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';

class NotFound extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <div style={{textAlign: "center"}}>
              <h1>Uh oh</h1>
              <h3>404: Page not found</h3>
              <strong>This is not the page you are looking for.</strong>
              <br/><a href="/" className="btn btn-primary">Take Me Home </a>
          </div>
        </Row>
      </Grid>
    );
  }
}

export default NotFound;
