import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';

import TreeView from '../../components/treeView';
import MainView from '../../components/mainView';
import './dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <TreeView />
          <MainView />
        </Row>
      </Grid>
    );
  }
}

export default Dashboard;
