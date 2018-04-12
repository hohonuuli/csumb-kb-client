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
      error: '',
    };
  }

  handleChange(e){
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    if(this.state.password === '' || this.state.username === ''){
      this.setState({error: "Empty fields"});
    }else if(this.state.passwordConf !== this.state.password){
      this.setState({error: "Passwords don't match"});
    }
    else{
      const creds = { username: this.state.username.trim(),password: this.state.password.trim() }
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
          <FormGroup>
            <Col style={{width: "500px", margin: "0 auto", textAlign: "center"}}>
              <Button type="submit" style={{width: "250px"}}>Create user</Button>
            </Col>
          </FormGroup>
        </Form>
        {error &&
          <AlertComp show={true} message={this.state.error}/>
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
