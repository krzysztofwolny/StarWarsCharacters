import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './Searchresult.module.scss';

import { addOrdinalNumber, filterFunction, paginationFunction } from '../../functions/filterFunction';

import CharactersList from '../CharctersList/CharactersList';
import FilterComponent from '../FilterComponent/FilterComponent';

const SearchResultPage = ({ dataSearch }) => {
    const allCharactersRaw = useSelector(state => state.results);
    const allCharacters = addOrdinalNumber(allCharactersRaw);
    const [charactersToDisplay, setCharactersToDisplay] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsCount = filterFunction(allCharacters, dataSearch.param1, dataSearch.param2, dataSearch.filterType).length;
    const pagesCount = Math.ceil(itemsCount / itemsPerPage);

    //display data on first render of search result view
    useEffect(() => {
        if(allCharactersRaw)
        console.log(itemsCount)
        setCharactersToDisplay(paginationFunction(
                                                filterFunction(
                                                            allCharacters, 
                                                            dataSearch.param1, 
                                                            dataSearch.param2, 
                                                            dataSearch.filterType),
                                                itemsPerPage, currentPage, itemsCount));
    }, [allCharactersRaw]);

    const changeItemsPerPage = (howMany) => {
        setItemsPerPage(howMany);
    };

    const nextPage = () => {
        if(currentPage === itemsCount) {
            console.log(itemsCount, pagesCount)
            setCurrentPage(1);
        } else {
            setCurrentPage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if(currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return(
        <div className={styles.mainView}>
            SearchResult:
            <p>{dataSearch.param1}</p>
            <p>{dataSearch.param2}</p>
            <p>{dataSearch.filterType}</p>
            <FilterComponent filterParameters="smt" />
            <p>Showing {itemsPerPage} items per page</p>
            <button onClick={() => changeItemsPerPage(5)}>5 items per page</button>
            <button onClick={() => changeItemsPerPage(10)}>10 items per page</button>
            <CharactersList characters={charactersToDisplay}/>
            <div className={styles.mainView__pagesNav}>
                <button onClick={() => previousPage()}>Previous Page</button>
                <p>{currentPage} / {pagesCount}</p>
                <button onClick={() => nextPage()}>Next Page</button>
            </div>
        </div>
    );
};

export default SearchResultPage;