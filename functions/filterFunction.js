import _ from 'lodash';
import { checkFavourites } from './storeFunctions';

export const paginationFunction = ( inputFromState, 
                                howManyItemsPerPage,
                                acctualViewedPage,
                                numberOfAllRecords) => {

    const numberOfAllPages = Math.ceil(numberOfAllRecords / howManyItemsPerPage);
    //calculate starting point for slice
    const start = (page) => {
       if(page === 1 || page > numberOfAllPages) {
        return 0
       } else if (page > 1 && page <= numberOfAllPages) {
        return (acctualViewedPage * howManyItemsPerPage) - howManyItemsPerPage
       } else {
           return 0
       }
    }; 
                           
    const toView = inputFromState.splice(start(acctualViewedPage), howManyItemsPerPage);
    return toView;
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
        console.log(filteredData)
        return filteredData
    //search between given hight range
    } else if (searchType === 'height') {
        charactersInput.forEach( el => {
            if(parseInt(el.height) >= onParam1 && parseInt(el.height) <= onParam2 ) {
                filteredData.push(el);
            }
        });
        return filteredData
    //search by name - fultext search
    } else if (searchType === 'name') {
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
    //search by the eye color
    } else if (searchType === 'eyecolor') {
        charactersInput.forEach( el => {
            if(el.eye_color.toLowerCase() === onParam1.toLowerCase()) {
                filteredData.push(el);
            }
        });
        return filteredData 
        //show favourites
    } else if (searchType === 'favourites') {
        console.log("search for favourites")
        charactersInput.forEach( el => {
            if(checkFavourites(el.name, el.height, el.eye_color)) {
                filteredData.push(el);
            }
        });
        return filteredData
    } else {
        return charactersInput
    }
    
};