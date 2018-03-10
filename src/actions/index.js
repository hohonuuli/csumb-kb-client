export const setCurrentObject = (data) => {
    console.log("You set object", data);
    return {
        type: 'SET_CURRENT_OBJECT',
        currentObject: data
    }
};
