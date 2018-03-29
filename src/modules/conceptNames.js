export const SET_CONCEPT_NAMES = 'SET_CONCEPT_NAMES';
//Action for setting current object
export default (state = null, action) => {
  switch (action.type) {
    case SET_CONCEPT_NAMES:
      return {
        ...state,
        conceptNames: action.conceptNames
      };

    default:
      return state;
  }
};
