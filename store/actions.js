import axios from 'axios';
import _ from 'lodash';
import { insertSpeciesNames } from '../functions/storeFunctions';

const fetchCharactersSuccess = (characters) => {
    return {
    type: 'FETCH_CHARACTERS_SUCCESS',
    payload: { characters }
}};

//fetch firs data portion and store it to redux state
export const fetchCharacters = () => {
    return async dispatch => {
        try {
            const characters = await axios.get('https://swapi.dev/api/people/');
            //copy imported data to further modifiction
            let charctersDataCopy = _.cloneDeep(characters.data);
            //swap array of urls to array of fetched names and insert them in data prepared to saving
            const updateIncomingData = characters.data.results.forEach( (el, idx) => {
                const newSpeciesArray = insertSpeciesNames(el.species);
                charctersDataCopy.results[idx].species = newSpeciesArray;
            });
            dispatch(fetchCharactersSuccess(charctersDataCopy));
        }
        catch(error) {
            console.log(error)
        }
    }
};

//fetch next pages of characters data, only when needed
const fetchAdditionalDataSuccess = (newCharacters) => {
    return {
        type: 'FETCH_ADDITIONAL_DATA',
        payload: { newCharacters }
    }
}; 

export const fetchAditionalData = (pageNumber) => {
    return async dispatch => {
        try {
            const newCharacters = await axios.get(`http://swapi.dev/api/people/?page=${pageNumber}`);
            let newCharactersDataCopy = _.cloneDeep(newCharacters.data.results);
            const updateIncomingData = newCharacters.data.results.forEach( (el, idx) => {
                const newSpeciesArray = insertSpeciesNames(el.species);
                newCharactersDataCopy[idx].species = newSpeciesArray;
            });
            dispatch(fetchAdditionalDataSuccess(newCharactersDataCopy));
        }
        catch(error) {
            console.log(error)
        }
    }
};

//fetch all data for search and filter purposes

const fetchAllCharactersSuccess = (allCharacters) => {
    return {
        type: 'FETCH_ALL_DATA',
        payload: { allCharacters }
    }
};

export const fetchAllCharacters = (numberOfAllRecords) => {
    return async dispatch => {
        try {
            //pages in API are divided by 10 items. For loop will fetch all pges.
            const numberOfPages = Math.ceil(numberOfAllRecords / 10);
            for(let i = 1; i <= numberOfPages; i++) {
                //tutaj pobieramy wszystko po kolei.
                //pamiętaj, że za każdym razem trzeba obrobić species
            }
        }
        catch(error) {
            console.log(error)
        }
    }
};