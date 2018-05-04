import React from 'react';

import { Button, ButtonToolbar, Form } from 'react-bootstrap';
import { FormGroup, ControlLabel, FormControl, Modal } from 'react-bootstrap';
import AlertComp from '../alertComp';


class UpdateProperty extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
        toConcept: '',
        linkName: '',
        linkValue: '',
        error: '',
        alertStyle: '',
    };

  }

  handleSubmit(e){
    e.preventDefault();
    var {refreshConcept} = this.props;
    if(this.state.newName === '' ){
      this.setState({error: "Empty fields"});
    }else{
      let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
      }

      var fetchString = 'http://localhost:4567/updateLinkRealization/' + this.props.conceptName + '?toConcept=' + this.state.toConcept + '&linkName='+ this.state.linkName
      + '&linkValue=' + this.state.linkValue + '&userName=' + sessionStorage.getItem('access_username') + '&jwt=' + sessionStorage.getItem('access_token');
      fetch(fetchString, config)
        .then(response =>
          response.json().then(user => ({ user, response }))
              ).then(({ user, response }) =>  {
          if (!response.ok) {
            this.setState({error: user.message, alertStyle: 'danger'});
          } else if(user.code === "401") {
              this.setState({error: user.message, alertStyle: 'danger'});
          } else {
              this.setState({error: "Property was updated.", alertStyle: 'success'});
              refreshConcept(this.props.conceptName);
              setTimeout(() => {
                this.handleClose()
              }, 3000);
          }
        }).catch(err => this.setState({error: err, alertStyle: 'danger'}))
    }
  }

  handleChange(e){
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
            <Button bsStyle="primary" className="pull-right" bsSize="sm" onClick={this.handleShow}>
              Update
            </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{textTransform: "capitalize"}}>Update property: {this.props.conceptName}</Modal.Title>
          </Modal.Header>
            {this.state.error &&
                <AlertComp show={true} bsStyle={this.state.alertStyle} message={this.state.error}/>
            }
          <Modal.Body style={{padding: "0 30px 0 30px"}}>

            <Form horizontal>
                <FormGroup controlId="linkName" >
                    <ControlLabel>Link: </ControlLabel>
                    <FormControl type="text" name="linkName" placeholder={this.props.linkName} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup controlId="toConcept" >
                    <ControlLabel>To: </ControlLabel>
                    <FormControl type="text" name="toConcept" placeholder={this.props.toConcept} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup controlId="linkValue" >
                    <ControlLabel>Value: </ControlLabel>
                    <FormControl type="text" name="linkValue" placeholder={this.props.linkValue} onChange={this.handleChange}/>
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

export default UpdateProperty;
