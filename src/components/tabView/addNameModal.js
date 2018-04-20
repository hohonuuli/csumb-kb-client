import React from 'react';

import { Button, Form, Radio } from 'react-bootstrap';
import { FormGroup, ControlLabel, FormControl, Modal } from 'react-bootstrap';
import AlertComp from '../../components/common/alertComp';


class AddName extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
        newName: '',
        applyTo: '',
        userAcc: '',
        type: '',
        error: '',
        alertStyle: '',
    };

  }

  handleSubmit(e){
    e.preventDefault();
    if(this.state.newName === '' || this.state.applyTo === '' ){
      this.setState({error: "Empty fields"});
    }else{
      let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
      }

      var fetchString = 'http://localhost:4567/addConceptName/' + this.state.applyTo +
      '?type=' + this.state.type + '&conceptName=' + this.state.newName + '&jwt=' + sessionStorage.getItem('access_token')
      + "&userName=" + sessionStorage.getItem("access_username");
      fetch(fetchString, config)
        .then(response =>
          response.json().then(user => ({ user, response }))
              ).then(({ user, response }) =>  {
          if (!response.ok) {
            this.setState({error: user.message, alertStyle: 'danger'});
          } else if(user.code === "401") {
              this.setState({error: user.message, alertStyle: 'danger'});
          } else {
              this.setState({error: "Name was added.", alertStyle: 'success'});
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
          Add Name
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{textTransform: "capitalize"}}>{this.props.conceptName}</Modal.Title>
          </Modal.Header>
            {this.state.error &&
                <AlertComp show={true} bsStyle={this.state.alertStyle} message={this.state.error}/>
            }
          <Modal.Body style={{padding: "0 30px 0 30px"}}>

            <Form horizontal>
                <FormGroup controlId="newName" >
                    <ControlLabel>Name: </ControlLabel>
                    <FormControl type="text" name="newName" placeholder="Name" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup controlId="applyTo" >
                    <ControlLabel>Concept to apply to: </ControlLabel>
                    <FormControl type="text" name="applyTo" placeholder="Apply to" onChange={this.handleChange} />
                </FormGroup>
                <ControlLabel>Type:    </ControlLabel>
                <Radio name="radioGroup" value="common" onChange={this.handleChange} inline>  Common</Radio>
                <Radio name="radioGroup" value="synonym" onChange={this.handleChange} inline>Synonym</Radio>
                <Radio name="radioGroup" value="former" onChange={this.handleChange} inline>Former</Radio>
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

export default AddName;
