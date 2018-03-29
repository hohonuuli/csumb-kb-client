export const SET_CURRENT_OBJECT = 'SET_CURRENT_OBJECT';
//Action for setting current object
export default (state = { currentObject: {} }, action) => {
  switch (action.type) {
    case SET_CURRENT_OBJECT:
      return {
        ...state,
        currentObject: action.currentObject
      };

    default:
      return state;
  }
};
