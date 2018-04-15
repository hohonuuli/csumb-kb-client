import React, { Component } from 'react';
import {Alert} from 'react-bootstrap';

class AlertComp extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: this.props.show
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
      setTimeout(this.handleDismiss, 3000);
      return (
        <div style={{width: "80%", margin: "0 auto"}}>
        <Alert bsStyle={this.props.bsStyle} onDismiss={this.handleDismiss}>
          <strong id="alertError">{this.props.message}</strong> <span id="alertText"></span>
        </Alert>
        </div>
      );
    }
    return <div></div>
  }
}

export default AlertComp;
