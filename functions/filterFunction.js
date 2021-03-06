import _ from 'lodash';
import { checkFavourites } from './storeFunctions';
import Router from 'next/router';

export const paginationFunction = ( inputFromState, 
                                howManyItemsPerPage,
                                acctualViewedPage,
                                numberOfAllRecords) => {

    const numberOfAllPages = Math.ceil(numberOfAllRecords / howManyItemsPerPage);
    //calculate starting point for slice
    const start = (page) => {
       if(page === 1 || page > numberOfAllPages) {
        return 0
       };
       if (page > 1 && page <= numberOfAllPages) {
        return (acctualViewedPage * howManyItemsPerPage) - howManyItemsPerPage
       };
        return 0
    }; 
    //error handling after serch result page refresh
    if(inputFromState) {
        return inputFromState.splice(start(acctualViewedPage), howManyItemsPerPage);
    } 
    if(confirm("Something went wrong! Going back to homepage! Quick! Click 'ok' and then refresh the page.")) {
        Router.push('/');
    }
};

export const addOrdinalNumber = (inputCharacters) => {
    let inputCharactersCopy = _.cloneDeep(inputCharacters);
    if(inputCharacters) {
        inputCharacters.forEach( (el, idx) => {
            const newElement = {
                ...el,
                on: idx + 1
            };
            inputCharactersCopy[idx] = newElement;
        });
    }
    return inputCharactersCopy
};

//check if nothing was found
export const nothingWasFound = (filterFunctionResult) => {
    if(filterFunctionResult.length === 0) {
        return true
    };
    return false
};

//takes all characters and returns characters array according to given search parameters
export const filterFunction = (charactersInput, onParam1, onParam2, searchType) => {
    //this part hapens when the search type is for ordinary numbers
    let filteredData = [];
    if(searchType === "ordinaryNumber") {
        charactersInput.forEach( el => {
            if(el.on >= onParam1 && el.on <= onParam2 ) {
                filteredData.push(el);
            }
        });
        return filteredData
    };
    //search between given hight range
    if (searchType === 'height') {
        charactersInput.forEach( el => {
            if(parseInt(el.height) >= onParam1 && parseInt(el.height) <= onParam2 ) {
                filteredData.push(el);
            }
        });
        return filteredData
    };
    //search by name - fultext search
    if (searchType === 'name') {
        //prepare array from name and given search strings
        charactersInput.forEach( el => {
            //check if the given search hits directly
            if(el.name.toLowerCase() === onParam1.toLowerCase()) {
                filteredData.push(el)
            }
        });
        //if given search have not be found as full string, try to find less acurate match
        if(filteredData.length === 0) {
            charactersInput.forEach( el => {
                const splitInput = el.name.toLowerCase().split(' ');
                const splitParam = onParam1.toLowerCase().split(' ');
                if(splitInput.some(r=> splitParam.indexOf(r) >= 0)) {
                    filteredData.push(el);
                }
            });
        }
        return filteredData
    };
    //search by the eye color
    if (searchType === 'eyecolor') {
        charactersInput.forEach( el => {
            if(el.eye_color.toLowerCase() === onParam1.toLowerCase()) {
                filteredData.push(el);
            }
        });
        return filteredData 
    };
    //show favourites
    if (searchType === 'favourites') {
        charactersInput.forEach( el => {
            if(checkFavourites(el.name, el.height, el.eye_color)) {
                filteredData.push(el);
            }
        });
        return filteredData
    }
    return charactersInput    
};