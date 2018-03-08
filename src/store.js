//Stores all of the applications state/data
//It's a big JS object

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './modules';

export const history = createHistory();

const initialState = {};
const enhancers = [];

//Middleware that supports thunk for actions written as functions
//And history
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

//Compose combines middleware and enhancers
const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

//Creates stores using reducers, init state and composed middleware
export default createStore(rootReducer, initialState, composedEnhancers);
