import axios from 'axios';

const fetchCharactersSuccess = (characters) => {
    return {
    type: 'FETCH_CHARACTERS_SUCCESS',
    payload: { characters }
}};
//fetch firs data portion and store it to redux state
export const fetchCharacters = () => {
    return async dispatch => {
        try {
            let characters = await axios.get('https://swapi.dev/api/people/');
            dispatch(fetchCharactersSuccess(characters.data));
        }
        catch(error) {
            console.log(error)
        }
    }
};

const fetchAdditionalDataSuccess = (newCharacters) => {
    return {
        type: 'FETCH_ADDITIONAL_DATA',
        payload: { newCharacters }
    }
}
//fetch next pages of characters data, only when needed
export const fetchAditionalData = (pageNumber) => {
    return async dispatch => {
        try {
            let newCharacters = await axios.get(`http://swapi.dev/api/people/?page=${pageNumber}`);
            console.log("action", newCharacters.data.results);
            dispatch(fetchAdditionalDataSuccess(newCharacters.data.results))
        }
        catch(error) {
            console.log(error)
        }
    }
}