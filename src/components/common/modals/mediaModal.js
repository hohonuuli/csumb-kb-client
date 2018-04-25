import React from 'react';

import { Button, Form, FormGroup, ControlLabel, FormControl, Modal} from 'react-bootstrap';
import AlertComp from '../alertComp';

class MediaModal extends React.Component {
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
  
  componentWillUnmount(){
    this.setState({show: false, error: ''})
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
    
      var fetchString = 'http://localhost:4567/addConceptMedia/' + this.props.conceptName + 
      '?type=' + this.state.type + '&url=' + this.state.url + '&caption=' + this.state.caption + '&credit=' + this.state.credit + 
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
              this.setState({error: "Media item was added.", alertStyle: 'success'});
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
          Add new media
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New media item</Modal.Title>
          </Modal.Header>
            {this.state.error &&
                <AlertComp show={true} bsStyle={this.state.alertStyle} message={this.state.error}/>
            }
          <Modal.Body style={{padding: "0 30px 0 30px"}}>
            
            <Form horizontal>
                <FormGroup controlId="url" >
                    <ControlLabel>URL</ControlLabel>
                    <FormControl type="text" name="url" placeholder="Image URL" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup controlId="type" >
                    <ControlLabel>Type</ControlLabel>
                    <FormControl componentClass="select" placeholder="Select type" onChange={this.handleChange}>
                        <option value="image">Image</option>
                        <option value="icon">Icon</option>
                        <option value="video">Video</option>
                    </FormControl>
                </FormGroup>
                <FormGroup controlId="caption" >
                    <ControlLabel>Caption</ControlLabel>
                    <FormControl type="text" name="type" placeholder="Caption" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup controlId="credit" >
                    <ControlLabel>Credit</ControlLabel>
                    <FormControl type="text" name="type" placeholder="Credit" onChange={this.handleChange} />
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

export default MediaModal;
