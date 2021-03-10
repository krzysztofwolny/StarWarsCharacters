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
    const [itemsCount, setItemsCount] = useState(filterFunction(allCharacters, dataSearch.param1, dataSearch.param2, dataSearch.filterType).length);
    const pagesCount = Math.ceil(itemsCount / itemsPerPage);
    const [filterparam1, setFilterParam1] = useState(false);
    const [filterparam2, setFilterParam2] = useState(false);
    const [searchType, setSearchType] = useState(false);

    //display data on first render of search result view
    useEffect(() => {
        if(allCharactersRaw && !filterparam1)
        setCharactersToDisplay(paginationFunction(
                                                filterFunction(
                                                            allCharacters, 
                                                            dataSearch.param1, 
                                                            dataSearch.param2, 
                                                            dataSearch.filterType),
                                                itemsPerPage, currentPage, itemsCount));
    }, [allCharactersRaw, currentPage]);

    //make new search
    useEffect(() => {
        if(allCharactersRaw && filterparam1) {
            setItemsCount(filterFunction(allCharacters, filterparam1, filterparam2, searchType).length);
            setCharactersToDisplay(paginationFunction(
                filterFunction(
                            allCharacters, 
                            filterparam1, 
                            filterparam2, 
                            searchType),
                itemsPerPage, currentPage, itemsCount));
        }
    }, [filterparam1, currentPage, itemsPerPage]);

    const changeItemsPerPage = (howMany) => {
        setItemsPerPage(howMany);
    };

    const nextPage = () => {
        if(currentPage === pagesCount) {
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

    //set parameters to new search, then useEffect will trigger pagination function
    const filterHandler = (filterParameter1, filterParameter2, filterType) => {
        setFilterParam1(filterParameter1);
        setFilterParam2(filterParameter2);
        setSearchType(filterType);
    };

    return(
        <div className={styles.mainView}>
            SearchResult:
            <FilterComponent filterParameters={(data1, data2, type) => filterHandler(data1, data2, type)} />
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