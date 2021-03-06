import React from 'react';

import { Modal, Button } from 'react-bootstrap';
import AlertComp from '../alertComp';

class DeleteConceptModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      show: false,
      conceptName: '',
      error: '',
      alertStyle: '',
    };

  }
  handleClose() {
    this.setState({ show: false, error: '', alertStyle: ''});
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleChange(e){
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let config = {
    method: 'DELETE',
    headers: { 'Content-Type':'application/json' },
    }

    var fetchString = 'http://localhost:4567/deleteConcept/' + this.props.conceptName +
    '?jwt=' + sessionStorage.getItem('access_token') + "&userName=" + sessionStorage.getItem("access_username");

    fetch(fetchString, config)
    .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
        this.setState({error: user.message, alertStyle: 'danger'});
        } else if(user.code === "401") {
            this.setState({error: user.message, alertStyle: 'danger'});
        } else {
            this.setState({error: "Concept deleted", alertStyle: 'success'});
            setTimeout(() => {
                this.handleClose()
            }, 3000);
        }
    }).catch(err => {this.setState({error: 'Unknown error: Try again', alertStyle: 'danger'})})
  }

  render() {
    return (
      <div>
        <Button bsStyle="danger" className="pull-right" bsSize="sm" onClick={this.handleShow}>
          Delete Concept
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete concept?</Modal.Title>
          </Modal.Header>
          {this.state.error &&
            <AlertComp show={true} bsStyle={this.state.alertStyle} message={this.state.error}/>
          }
          <Modal.Footer>
            <Button onClick={this.handleClose}>No</Button>
            <Button bsStyle="danger" onClick={this.handleSubmit}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default DeleteConceptModal;
