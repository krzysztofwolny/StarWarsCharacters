import _ from 'lodash';

const initialState = [];

//update state with new characters. lodash cloneDeep function is used to copy the state
const addNewCharactersToState = (state, action) => {
    const copyState = _.cloneDeep(state);
    console.log("coppyState", copyState)
    let oldCharacters = copyState.results;
    action.forEach( el => {
            oldCharacters.push(el);
        });
    const updatedState = {
            ...copyState,
            results: oldCharacters
        }
    return updatedState;
};

const characters = (state = initialState , action) => {

    switch(action.type) {
        case 'FETCH_CHARACTERS_SUCCESS':
            return action.payload.characters
        case 'FETCH_ADDITIONAL_DATA':
            return addNewCharactersToState(state, action.payload.newCharacters)
        default:
            return state
    }
}

export default characters;