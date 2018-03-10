//set the current object
export const SET_CURRENT_OBJECT = 'SET_CURRENT_OBJECT';


export default (state = null, action) => {
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
