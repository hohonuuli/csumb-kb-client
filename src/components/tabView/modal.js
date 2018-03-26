import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { setCurrentObject } from '../../actions/index';

import { Popover, Modal, Button } from 'react-bootstrap';
import FormExample from './createConcept';


class ModalC extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.conceptName = '';
    // this.conceptName = '';

    this.state = {
      show: false
    };


  }

  handleSubmit() {
    console.log('sending.....', this.conceptName);
    fetch('http://localhost:4567/createConcept/' + this.conceptName, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
      body: JSON.stringify({
        name: this.conceptName,
        role: "Admin",
        userName: "Brian",
      }),

    })
    .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }).then(function(response) {
        console.log("success");
    }).catch(function(error) {
        console.log(error);
    });

  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  onFormChange(e) {
    this.conceptName = e.target.value;

  }

  render() {
    return (
      <div>
        <Button bsStyle="primary" className="pull-right" bsSize="sm" onClick={this.handleShow}>
          <p>Add new concept</p>
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New concept</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormExample onFormChange={this.onFormChange} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleSubmit}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalC;
