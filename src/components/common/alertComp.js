import React, { Component } from 'react';
import {Alert} from 'react-bootstrap';

class AlertComp extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: this.props.show,
      error: this.props.message
    };

    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleDismiss() {
    this.setState({ show: false, error: '' });
  }

  handleShow() {
    this.setState({ show: true });
  }
  componentWillUnmount(){
    this.setState({show: false, error: ''})
  }
  componentDidMount(){
    setTimeout(this.handleDismiss, 2000);
  }
  render() {
    if(this.state.show){
      return (
        <div style={{width: "80%", margin: "0 auto"}}>
        <Alert bsStyle={this.props.bsStyle} onDismiss={this.handleDismiss}>
          <strong id="alertError">{this.state.error}</strong> <span id="alertText"></span>
        </Alert>
        </div>
      );
    }
    return <div></div>
  }
}

export default AlertComp;
