import React from 'react';

import { Col, Form, FormControl, FormGroup, ControlLabel, Modal, Button } from 'react-bootstrap';
import AlertComp from '../alertComp';

class AddTemplateModal extends React.Component {
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
      linkName: '',
      linkTo: '',
      linkValue: '',
      linkFrom: '',
      showAlert: false,
    };

  }
  handleClose() {
    this.setState({ show: false, error: '', alertStyle: '', showAlert: ''});
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
    if(this.state.linkTo === '' || this.state.linkFrom === '' || this.state.linkName === '' || this.state.linkValue === ''){
      this.setState({error: 'Empty fields', alertStyle: 'danger', showAlert: true});
    }else{
      let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
      }

    var fetchString = 'http://localhost:4567/addLinkTemplate/' + encodeURIComponent((this.props.conceptName).trim()) +
    '?toConcept=' + this.state.linkTo + '&linkName=' + this.state.linkName + '&linkValue=' + this.state.linkValue + '&linkFrom=' + this.state.linkFrom +
    '&jwt=' + sessionStorage.getItem('access_token') + "&userName=" + sessionStorage.getItem("access_username");
    
    console.log(this.state);
      fetch(fetchString, config)
        .then(response =>
          response.json().then(user => ({ user, response }))
              ).then(({ user, response }) =>  {
          if (!response.ok) {
            this.setState({error: user.message, alertStyle: 'danger', showAlert: true});
          } else if(user.code === "401") {
              this.setState({error: user.message, alertStyle: 'danger', showAlert: true});
          } else {
              this.setState({error: "Link template added", alertStyle: 'success', showAlert: true});
              this.props.refreshConcept(this.props.conceptName);
              setTimeout(() => {
                this.handleClose()
              }, 3000);
          }
        }).catch(err => {this.setState({error: 'Unknown error: Try again', alertStyle: 'danger', showAlert: true})})
    }
  }

  render() {
    return (
      <div style={{display: 'contents'}}>
        <Button bsStyle="primary" className="pull-right" bsSize="sm" onClick={this.handleShow}>
          New Link Template
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{textTransform: "capitalize"}}>Update Link: {this.props.conceptName}</Modal.Title>
          </Modal.Header>
            {this.state.error &&
                <AlertComp show={this.state.showAlert} bsStyle={this.state.alertStyle} message={this.state.error}/>
            }
          <Modal.Body style={{padding: "10px 30px 0 30px"}}>

            <Form horizontal>
          <FormGroup controlId="linkFrom">
              <Col componentClass={ControlLabel} sm={2}>
              From:
              </Col>
              <Col sm={10}>
                  <FormControl type="text" placeholder="" onChange={this.handleChange}/>
              </Col>
          </FormGroup>
          <FormGroup controlId="linkName">
              <Col componentClass={ControlLabel} sm={2}>
              Link:
              </Col>
              <Col sm={10}>
              <FormControl type="text" placeholder=""  onChange={this.handleChange}/>
              </Col>
          </FormGroup>
          <FormGroup controlId="linkTo">
              <Col componentClass={ControlLabel} sm={2}>
              To:
              </Col>
              <Col sm={10}>
              <FormControl type="text" placeholder="" onChange={this.handleChange}/>
              </Col>
          </FormGroup>
          <FormGroup controlId="linkValue">
              <Col componentClass={ControlLabel} sm={2}>
              Value:
              </Col>
              <Col sm={10}>
              <FormControl type="text" placeholder="" onChange={this.handleChange}/>
              </Col>
          </FormGroup>

      </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleSubmit}>New Link Template</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddTemplateModal;
