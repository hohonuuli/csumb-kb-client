import React, {Component} from 'react';

import { Button, Form, Radio } from 'react-bootstrap';
import { FormGroup, ControlLabel, FormControl, Modal } from 'react-bootstrap';
import AlertComp from '../alertComp';


class UpdateConceptNameModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
        newName: '',
        type: '',
        error: '',
        alertStyle: '',
        showAlert: ''
    };

  }

  handleSubmit(e){
    e.preventDefault();
    var {refreshConcept} = this.props;
    if(this.state.newName === ''){
      this.setState({error: "Empty fields", alertStyle: 'danger'});
    }else if(this.state.newName === this.props.conceptName){
        console.log('same')
    }else{
      let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
      }
      var fetchString = 'http://localhost:4567/updateConceptName/' + encodeURIComponent((this.props.conceptName).trim()) +
      '?type=' + this.state.type + '&newConceptName=' + this.state.newName + '&jwt=' + sessionStorage.getItem('access_token')
      + "&userName=" + sessionStorage.getItem("access_username");
      fetch(fetchString, config)
        .then(response =>
          response.json().then(user => ({ user, response }))
              ).then(({ user, response }) =>  {
          if (!response.ok) {
            this.setState({error: user.message, alertStyle: 'danger', showAlert: true});
          } else if(user.code === "401") {
              this.setState({error: user.message, alertStyle: 'danger', showAlert: true});
          } else {
              this.setState({error: "Name was updated.", alertStyle: 'success', showAlert: true});
              refreshConcept(this.props.parentConcept);
              setTimeout(() => {
                this.handleClose()
              }, 3000);
          }
        }).catch(err => this.setState({error: 'Unknown error: Try again', alertStyle: 'danger'}))
    }
  }

  handleChange(e){
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleClose() {
    this.setState({ show: false, showAlert: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  componentWillUnmount(){
    this.setState({error: '', alertStyle: '', showAlert: false})
  }
  render() {
    return (
      <div style={{display: 'contents'}}>
        <Button bsStyle="primary" className="pull-right" bsSize="sm" onClick={this.handleShow}>
          Update
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{textTransform: "capitalize"}}>Update name: {this.props.conceptName}</Modal.Title>
          </Modal.Header>
            {this.state.error &&
                <AlertComp show={this.state.showAlert} bsStyle={this.state.alertStyle} message={this.state.error}/>
            }
          <Modal.Body style={{padding: "0 30px 0 30px"}}>

            <Form horizontal>
                <FormGroup controlId="newName" >
                    <ControlLabel>Name: </ControlLabel>
                    <FormControl type="text" name="newName" placeholder="Name" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                  <ControlLabel style={{paddingRight: '5px'}}>Type:</ControlLabel>
                  <Radio id="type" value="Common" checked={this.state.type === "Common"}  onChange={this.handleChange} inline>Common</Radio>
                  <Radio id="type" value="Synonym" checked={this.state.type === "Synonym"} onChange={this.handleChange} inline>Synonym</Radio>
                  <Radio id="type" value="Former" checked={this.state.type === "Former"} onChange={this.handleChange} inline>Former</Radio>
                </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleSubmit}>Update name</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default UpdateConceptNameModal;
