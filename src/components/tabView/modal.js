import React from 'react';

import { Modal, Button } from 'react-bootstrap';
import FormExample from './createConcept';


class ModalC extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setName = this.setName.bind(this);
    this.setAuthor = this.setAuthor.bind(this);
    this.setType =this.setType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.conceptName = '';
    this.author = '';
    this.type = '';


    this.state = {
      show: false
    };

  }

  handleSubmit() {
    const data = {
      conceptName: this.conceptName,
      userName: sessionStorage.getItem("access_username"),
      password: sessionStorage.getItem("access_token")
    }
    console.log('sending.....', this.conceptName); // to do: find neater way to write query params
    fetch('http://localhost:4567/createConcept/' + this.conceptName +'?userName=' +data.userName+'&jwt='+data.password, {
    method: 'POST',
      body: JSON.stringify({
        name: this.conceptName,
        author: this.author,
        type: this.type,
        role: "Admin", //get actual role
      }),

    })
    .then(function(response) {
        const res = response.json();
        res.then((json) => console.log(json) )
        this.setState({ show: false });
        console.log(response);

    }).catch(function(error) {
        console.log(error);
    });

    this.handleClose();

  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  setName(e) {
    this.conceptName = e.target.value;
  }

  setAuthor(e){
    this.author = e.target.value;
  }

  setType(e){
    this.type = e.target.value;
  }

  render() {
    return (
      <div>
        <Button bsStyle="primary" className="pull-right" bsSize="sm" onClick={this.handleShow}>
          Add new concept
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New concept</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormExample setName={this.setName} setAuthor={this.setAuthor} setType={this.setType} />
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
