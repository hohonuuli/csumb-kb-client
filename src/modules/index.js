//A reducer just takes in actions and updates
//part of application state, this will combine all reducers

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  router: routerReducer,
});
