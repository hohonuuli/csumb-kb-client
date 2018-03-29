export const setCurrentObject = (data) => {
  return {
      type: 'SET_CURRENT_OBJECT',
      currentObject: data
  }
};
export const setConceptNames = (data) => {
  return {
    type: 'SET_CONCEPT_NAMES',
    conceptNames: data
  }
}
