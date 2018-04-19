import React from 'react';

import { Form, FormControl, FormGroup, ControlLabel, Modal, Button } from 'react-bootstrap';
import AlertComp from '../../components/common/alertComp';

class ConceptModal extends React.Component {
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
    this.setState({ show: false });
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
    if(this.state.conceptName === '' ){
      this.setState({error: "Enter a name", alertStyle: 'danger'});
    }else{
      let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
      }
    
      var fetchString = 'http://localhost:4567/createConcept/' + this.state.conceptName + "?parent=" + this.props.parent +
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
              this.setState({error: "Name added to concept", alertStyle: 'success'});
          }
        }).catch(err => {console.log(err); this.setState({error: err, alertStyle: 'danger'})})
    }
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
          {this.state.error &&
            <AlertComp show={true} bsStyle={this.state.alertStyle} message={this.state.error}/>
          }
          <Modal.Body>
          <Form>
            <FormGroup
              controlId="conceptName"
            >
              <ControlLabel>Concept Name</ControlLabel>
              <FormControl
                type="text"
                name="name"
                placeholder="Enter name"
                onChange={this.handleChange}
              />
            </FormGroup>
          </Form>
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

export default ConceptModal;
