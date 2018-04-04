//A reducer just takes in actions and updates
//part of application state. This will combine all reducers

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import currentObjectReducer from './currentObject';

export default combineReducers({
  router: routerReducer,
  currentObject: currentObjectReducer,
  auth: authReducer,
});
