export const paginationFunction = ( inputFromState, 
                                howManyItemsPerPage,
                                acctualViewedPage,
                                numberOfAllRecords) => {

    const numberOfAllPages = Math.ceil(numberOfAllRecords / howManyItemsPerPage);

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
}