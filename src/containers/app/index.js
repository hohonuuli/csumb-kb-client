import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../components/header';
import Dashboard from '../dashboard';
import Login from '../login';
import Profile from '../profile';

class App extends Component {
  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props
    return (
      <div>
      <header>
        <Header isAuthenticated={isAuthenticated} errorMessage={errorMessage} dispatch={dispatch}/>
      </header>

      <main>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/profile" component={Profile}/>
      </main>
    </div>
  );
  }
}

function mapStateToProps(state) {

    const {auth} = state;
    const {isAuthenticated, errorMessage} = auth;

    return {
        isAuthenticated,
        errorMessage
    }
}

export default connect(mapStateToProps)(App)
