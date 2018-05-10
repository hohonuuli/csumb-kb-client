import React, {Component} from 'react';

import { Button, Form } from 'react-bootstrap';
import { Col, FormGroup, ControlLabel, FormControl, Modal } from 'react-bootstrap';
import AlertComp from '../alertComp';


class UpdateLinkModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
        linkFrom: '',
        linkTo: '',
        linkName: '',
        linkValue: '',
        error: '',
        alertStyle: '',
        showAlert: '',
        oldLinkName: '',
    };

  }

  handleSubmit(e){
    e.preventDefault();
    var {refreshConcept} = this.props;
    let config = {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
    }
    var fetchString = 'http://localhost:4567/updateLinkTemplate/' + encodeURIComponent((this.state.linkFrom).trim()) +
    '?toConcept=' + this.state.linkTo + '&newLinkName=' + this.state.linkName + 
    '&linkValue=' + this.state.linkValue +'&oldLinkName=' + this.state.oldLinkName + 
    '&jwt=' + sessionStorage.getItem('access_token') + "&userName=" + sessionStorage.getItem("access_username");

    fetch(fetchString, config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
          this.setState({error: user.message, alertStyle: 'danger', showAlert: true});
        } else if(user.code === "401") {
            this.setState({error: user.message, alertStyle: 'danger', showAlert: true});
        } else {
            this.setState({error: "Link was updated.", alertStyle: 'success', showAlert: true});
            refreshConcept(this.props.parentConcept);
            setTimeout(() => {
              this.handleClose()
            }, 3000);
        }
      }).catch(err => this.setState({error: 'Unknown error: Try again', alertStyle: 'danger'}))
  }

  handleChange(e){
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleClose() {
    this.setState({ show: false, showAlert: false, error: '' });
  }

  handleShow() {
    this.setState({ 
      show: true, 
      oldLinkName: this.props.templateItem.linkName,
      linkFrom: 'self',
      linkTo: this.props.templateItem.toConcept,
      linkName: this.props.templateItem.linkName,
      linkValue: this.props.templateItem.linkValue,
    });
  }

  componentWillUnmount(){
    this.setState({})
  }
  render() {
    return (
      <div style={{display: 'contents'}}>
        <Button bsStyle="primary" className="pull-right" bsSize="sm" onClick={this.handleShow}>
          Update
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
                  <FormControl type="text" placeholder="" value={this.state.linkFrom} onChange={this.handleChange}/>
              </Col>
          </FormGroup>
          <FormGroup controlId="linkName">
              <Col componentClass={ControlLabel} sm={2}>
              Link:
              </Col>
              <Col sm={10}>
              <FormControl type="text" placeholder="" value={this.state.linkName} onChange={this.handleChange}/>
              </Col>
          </FormGroup>
          <FormGroup controlId="linkTo">
              <Col componentClass={ControlLabel} sm={2}>
              To:
              </Col>
              <Col sm={10}>
              <FormControl type="text" placeholder="" value={this.state.linkTo} onChange={this.handleChange}/>
              </Col>
          </FormGroup>
          <FormGroup controlId="linkValue">
              <Col componentClass={ControlLabel} sm={2}>
              Value:
              </Col>
              <Col sm={10}>
              <FormControl type="text" placeholder="" value={this.state.linkValue} onChange={this.handleChange}/>
              </Col>
          </FormGroup>

      </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleSubmit}>Update Link</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default UpdateLinkModal;
