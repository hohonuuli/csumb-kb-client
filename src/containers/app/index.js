import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';

import Header from '../../components/header';
import About from '../about';
import Dashboard from '../dashboard';
import Login from '../login';
import Profile from '../profile';
import NotFound from '../notFound';

class App extends Component {
  render() {
    return (
      <div>
      <header>
        <Header/>
      </header>

      <main>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/settings" component={Profile}/>
          <Route exact path="/about" component={About}/>
          <Route component={ NotFound } />
        </Switch>
      </main>
    </div>
  );
  }
}

export default App;
