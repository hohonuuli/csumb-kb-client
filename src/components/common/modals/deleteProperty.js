import React from 'react';

import { Modal, Button } from 'react-bootstrap';
import AlertComp from '../alertComp';

class DeleteProperty extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      show: false,
      conceptName: '',
      error: '',
      alertStyle: '',
    };

  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  componentWillUnmount(){
    this.setState({show: false, error: ''})
  }

  handleSubmit(e) {
    e.preventDefault();

    var {refreshConcept} = this.props;

    let config = {
    method: 'DELETE',
    headers: { 'Content-Type':'application/json' },
    }

    var fetchString = 'http://localhost:4567/deleteLinkRealization/' + this.props.conceptName + "?linkName=" + this.props.linkName +
    '&jwt=' + sessionStorage.getItem('access_token') + "&userName=" + sessionStorage.getItem("access_username");

    fetch(fetchString, config)
    .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
        this.setState({error: user.message, alertStyle: 'danger'});
        } else if(user.code === "401") {
            this.setState({error: user.message, alertStyle: 'danger'});
        } else {
            this.setState({error: "Property was deleted", alertStyle: 'success'});
            refreshConcept(this.props.conceptName);
            setTimeout(() => {
              this.handleClose()
            }, 3000);
        }
    }).catch(err => {console.log(err); this.setState({error: err, alertStyle: 'danger'})})
  }

  render() {
    return (
      <div style={{paddingBottom: "40px"}}>
        <Button bsStyle="danger" className="pull-right" bsSize="sm" onClick={this.handleShow}>
          Delete
        </Button>
        <Button bsStyle="primary" className="pull-right" bsSize="sm" onClick={this.handleShow}>
          Update
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete selected item?</Modal.Title>
          </Modal.Header>
          {this.state.error &&
            <AlertComp show={true} bsStyle={this.state.alertStyle} message={this.state.error}/>
          }
          <Modal.Body>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>No</Button>
            <Button bsStyle="primary" onClick={this.handleSubmit}>Yes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default DeleteProperty;
