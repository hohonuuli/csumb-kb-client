import React, {Component} from 'react';

import { Button, Form, Radio } from 'react-bootstrap';
import { FormGroup, ControlLabel, FormControl, Modal } from 'react-bootstrap';
import AlertComp from '../alertComp';


class UpdateMediaModal extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
  
      this.state = {
          show: false,
          url: '',
          caption: '',
          credit: '',
          type: 'Image',
          error: '',
          alertStyle: '',
      };
  
    }
    componentWillMount(){
        this.setState({
            url: this.props.mediaItem.url,
            type: this.props.mediaItem.type,
            caption: this.props.mediaItem.caption,
            credit: this.props.mediaItem.credit,
        });
    }
    
    componentWillUnmount(){
      this.setState({bsStyle: '', error: ''})
    }
  
    handleSubmit(e){
      e.preventDefault();
      var {refreshConcept } = this.props;
      if(this.state.url === '' || this.state.type === '' ){
        this.setState({error: "Empty fields", alertStyle: 'danger'});
      }else{
        let config = {
          method: 'POST',
          headers: { 'Content-Type':'application/json' },
        }
      
        var fetchString = 'http://localhost:4567/updateConceptMedia/' + this.props.conceptName + 
        '?type=' + this.state.type + '&previousUrl=' + this.props.mediaItem.url + '&caption=' + this.state.caption + 
        '&credit=' + this.state.credit + '&newUrl=' + this.state.url + 
        '&primary=false&jwt=' + sessionStorage.getItem('access_token') + "&userName=" + sessionStorage.getItem("access_username");
        fetch(fetchString, config)
          .then(response =>
            response.json().then(user => ({ user, response }))
                ).then(({ user, response }) =>  {
            if (!response.ok) {
              this.setState({error: user.message, alertStyle: 'danger'});
            } else if(user.code === "401") {
                this.setState({error: user.message, alertStyle: 'danger'});
            } else {
                this.setState({error: "Media item was updated.", alertStyle: 'success'});
                refreshConcept(this.props.conceptName);
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
      this.setState({ show: false, error: '', alertStyle: ''});
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
              <Modal.Title>Update media item</Modal.Title>
            </Modal.Header>
              {this.state.error &&
                  <AlertComp show={true} bsStyle={this.state.alertStyle} message={this.state.error}/>
              }
            <Modal.Body style={{padding: "0 30px 0 30px"}}>
              
              <Form horizontal>
                  <FormGroup controlId="url" >
                      <ControlLabel>URL</ControlLabel>
                      <FormControl type="text" name="url" placeholder="Image URL" value={this.state.url} onChange={this.handleChange} />
                  </FormGroup>
                  <FormGroup controlId="type" >
                      <ControlLabel>Type</ControlLabel>
                      <FormControl componentClass="select" value={this.state.type}  placeholder="Select type" onChange={this.handleChange}>
                          <option value="image">Image</option>
                          <option value="icon">Icon</option>
                          <option value="video">Video</option>
                      </FormControl>
                  </FormGroup>
                  <FormGroup controlId="caption" >
                      <ControlLabel>Caption</ControlLabel>
                      <FormControl type="text" name="type" placeholder="Caption" value={this.state.caption}  onChange={this.handleChange} />
                  </FormGroup>
                  <FormGroup controlId="credit" >
                      <ControlLabel>Credit</ControlLabel>
                      <FormControl type="text" name="type" placeholder="Credit" value={this.state.credit}  onChange={this.handleChange} />
                  </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
              <Button bsStyle="primary" onClick={this.handleSubmit}>Update</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }

export default UpdateMediaModal;
