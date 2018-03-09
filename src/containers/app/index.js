import React from 'react';
import { Route, Link } from 'react-router-dom';
// import Home from '../home';
import Dashboard from '../dashboard';
import Header from '../../components/header';

const App = () => (
  <div>
    <header>
      <Header/>
    </header>

    <main>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/login" component={Dashboard}/>
      <Route exact path="/profile" component={Dashboard}/>
    </main>
  </div>
);

export default App;
