import _ from 'lodash';

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
    if(searchType === "ordinaryNumber") {
        let filteredData = [];
        charactersInput.forEach( el => {
            if(el.on >= onParam1 && el.on <= onParam2 ) {
                filteredData.push(el);
            }
        });
        console.log(filteredData)
        return filteredData
    } else if (searchType === 'height') {
        let filteredData = [];
        charactersInput.forEach( el => {
            if(el.height >= onParam1 && el.height <= onParam2 ) {
                filteredData.push(el);
            }
        });
        return filteredData
    } else if (searchType === 'name') {
        let filteredData = [];
        charactersInput.forEach( el => {
            if(el.name === onParam1 ) {
                filteredData.push(el);
            }
        });
        return filteredData
    }
};