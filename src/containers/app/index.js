import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from '../../components/header';
import About from '../about';
import Dashboard from '../dashboard';
import Login from '../login';
import Profile from '../profile';

class App extends Component {
  render() {
    return (
      <div>
      <header>
        <Header/>
      </header>

      <main>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/settings" component={Profile}/>
        <Route exact path="/about" component={About}/>
      </main>
    </div>
  );
  }
}

export default App;
