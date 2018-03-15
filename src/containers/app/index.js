import React from 'react';
import { Route } from 'react-router-dom';

import Header from '../../components/header';
import Dashboard from '../dashboard';
import Login from '../login';
import Profile from '../profile';

const App = () => (
  <div>
    <header>
      <Header/>
    </header>

    <main>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/login" component={Login}/>
      <Route exact path="/profile" component={Profile}/>
    </main>
  </div>
);

export default App;
