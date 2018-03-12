import React, { Component } from 'react';
import {Alert} from 'react-bootstrap';

class AlertComp extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false
    };

    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleDismiss() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    if(this.state.show){
      return (
        <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
          <strong id="alertError">Warning!</strong> <span id="alertText"></span>
        </Alert>
      );
    }
    return <div></div>
  }
}

export default AlertComp;
