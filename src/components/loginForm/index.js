import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import { Button, Col, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import { loginUser } from '../../actions/userActions';
import './login.css';

class LoginForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: '',
      password: ''
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
      console.log("empty");
    }else{
      const creds = { username: this.state.username.trim(),password: this.state.password.trim() }
      this.props.dispatch(loginUser(creds));
      setTimeout(() => {this.props.history.push("/")}, 1000);
    }
  }
  render() {
    return (
      <div className="login-form">
        <h2 style={{paddingTop:"50px", textAlign: "center"}}>Knowledgebase Login</h2>
        <Form horizontal style={{paddingTop: "75px", width: "95%"}} onSubmit={this.handleSubmit}>
          <FormGroup controlId="username">
            <Col componentClass={ControlLabel} sm={2}>Username</Col>
            <Col sm={10}><FormControl type="text" placeholder="Username" onChange={this.handleChange}/></Col>
          </FormGroup>
          <FormGroup controlId="password">
            <Col componentClass={ControlLabel} sm={2}>Password</Col>
            <Col sm={10}><FormControl type="password" placeholder="Password" onChange={this.handleChange}/></Col>
          </FormGroup>
          <FormGroup>
            <Col style={{width: "500px", margin: "0 auto", textAlign: "center"}}>
              <Button type="submit" style={{width: "250px"}}>Sign in</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  
  const { auth } = state
  const { isAuthenticated } = auth
  
  return {
    isAuthenticated,
  }
}

export default withRouter(connect(mapStateToProps)(LoginForm));
