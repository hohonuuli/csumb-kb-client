export const setCurrentObject = (data) => {
  return {
      type: 'SET_CURRENT_OBJECT',
      currentObject: data
  }
};
export function refreshConcept(conceptName){
  return dispatch => {
    fetch("http://localhost:4567/getMetadata/" + conceptName)
    .then(res => res.json())
    .then(
      (result) => {
        dispatch(setCurrentObject(result));
      },
      (error) => {
        console.log(error);
      }
    )
  };
}