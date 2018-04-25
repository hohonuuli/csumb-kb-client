import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import { Button, Col, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import './registration.css';
import AlertComp from '../../components/common/alertComp';

class RegistrationForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: '',
      password: '',
      passwordConf: '',
      firstName: '',
      lastName: '',
      affil: '',
      email: '',
      error: '',
      role: '',
      alertStyle: '',
    };
  }

  handleChange(e){
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  componentWillUnmount(){
    this.setState({alertStyle: '', error: ''})
  }
  handleSubmit(e){
    e.preventDefault();
    if(this.state.password === '' || this.state.username === '' || this.state.firstName === '' || 
    this.state.lastName === '' || this.state.affil === '' || this.state.email === '' || this.state.role === '' || this.state.role === "empty"){
      this.setState({error: "Empty fields"});
    }else if(this.state.passwordConf !== this.state.password){
      this.setState({error: "Passwords don't match"});
    }
    else{
      let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
      }
    
      var fetchString = 'http://localhost:4567/addUserAccount/' + this.state.username + 
      '?password=' + this.state.password + '&firstName=' + this.state.firstName + '&lastName=' + this.state.lastName + 
      '&affiliation=' +  this.state.affil +  '&email=' + this.state.email + '&role=' + this.state.role;

      fetch(fetchString, config)
        .then(response =>
          response.json().then(user => ({ user, response }))
              ).then(({ user, response }) =>  {
          if (!response.ok) {
            this.setState({error: user.message, alertStyle: 'danger'});
          } else if(user.code === "401") {
              this.setState({error: "User account: " + this.state.username + " already exists.", alertStyle: 'danger'});
          } else {
              this.setState({error: "User account: " + this.state.username + " was created.", alertStyle: 'success'});
          }
        }).catch(err => this.setState({error: err, alertStyle: 'danger'}))
    }
  }
  componentWillMount(){
    if(!this.props.isAuthenticated){
      this.props.history.push("/");
    }
  }
  render() {
    const {error} = this.state;
    return (
      <div className="registration-form">
        <h2 style={{paddingTop:"50px", textAlign: "center"}}>Knowledgebase User Creation</h2>
        <Form horizontal style={{paddingTop: "75px", width: "95%"}} onSubmit={this.handleSubmit}>
          <FormGroup controlId="username">
            <Col componentClass={ControlLabel} sm={2}>Username</Col>
            <Col sm={10}><FormControl type="text" placeholder="Username" onChange={this.handleChange}/></Col>
          </FormGroup>
          <FormGroup controlId="password">
            <Col componentClass={ControlLabel} sm={2}>Password</Col>
            <Col sm={10}><FormControl type="password" placeholder="Password" onChange={this.handleChange}/></Col>
          </FormGroup>
          <FormGroup controlId="passwordConf">
            <Col componentClass={ControlLabel} sm={2}>Password Confirmation</Col>
            <Col sm={10}><FormControl type="password" placeholder="Password Confirmation" onChange={this.handleChange}/></Col>
          </FormGroup>
          <FormGroup controlId="firstName">
            <Col componentClass={ControlLabel} sm={2}>First name</Col>
            <Col sm={10}><FormControl type="text" placeholder="First name" onChange={this.handleChange}/></Col>
          </FormGroup>
          <FormGroup controlId="lastName">
            <Col componentClass={ControlLabel} sm={2}>Last name</Col>
            <Col sm={10}><FormControl type="text" placeholder="Last name" onChange={this.handleChange}/></Col>
          </FormGroup>
          <FormGroup controlId="email">
            <Col componentClass={ControlLabel} sm={2}>Email</Col>
            <Col sm={10}><FormControl type="text" placeholder="Email" onChange={this.handleChange}/></Col>
          </FormGroup>
          <FormGroup controlId="affil">
            <Col componentClass={ControlLabel} sm={2}>Affiliation</Col>
            <Col sm={10}><FormControl type="text" placeholder="Affiliation" onChange={this.handleChange}/></Col>
          </FormGroup>
          <FormGroup controlId="role">
          <Col componentClass={ControlLabel} sm={2}>Role</Col>
          <Col sm={10}>
            <FormControl componentClass="select" placeholder="Select Role" onChange={this.handleChange}>
              <option value="empty"></option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </FormControl>
          </Col>
          </FormGroup>
          <FormGroup>
            <Col style={{width: "500px", margin: "0 auto", textAlign: "center"}}>
              <Button type="submit" style={{width: "250px"}}>Create user</Button>
            </Col>
          </FormGroup>
        </Form>
        {error &&
          <AlertComp bsStyle={this.state.alertStyle} show={true} message={this.state.error}/>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  
  const { auth } = state
  const { isAuthenticated, errorMessage } = auth
  
  return {
    isAuthenticated,
    errorMessage
  }
}

export default withRouter(connect(mapStateToProps)(RegistrationForm));
