import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './Searchresult.module.scss';

import { addOrdinalNumber, filterFunction, paginationFunction, nothingWasFound } from '../../functions/filterFunction';

import CharactersList from '../CharctersList/CharactersList';
import FilterComponent from '../FilterComponent/FilterComponent';
import Header from '../Header/Header';
import PagesNavigation from '../pagesNavigation/pagesNavigation';
import ItemsPerPage from '../ItemsPerPage/ItemsPerPage';

const SearchResult = ({ dataSearch }) => {
    const allCharactersRaw = useSelector(state => state.results);
    const allCharacters = addOrdinalNumber(allCharactersRaw);
    const [charactersToDisplay, setCharactersToDisplay] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsCount, setItemsCount] = useState(allCharacters ? filterFunction(allCharacters, dataSearch.param1, dataSearch.param2, dataSearch.filterType).length : 0);
    const pagesCount = Math.ceil(itemsCount / itemsPerPage);
    const [filterparam1, setFilterParam1] = useState(false);
    const [filterparam2, setFilterParam2] = useState(false);
    const [searchType, setSearchType] = useState(false);
    const [nothingFound, setNothingFound] = useState(false)

    //display data on first render of search result view
    useEffect(() => {
        if(allCharactersRaw && !filterparam1)
        setItemsCount(filterFunction(allCharacters, dataSearch.param1, dataSearch.param2, dataSearch.filterType).length);
        setCharactersToDisplay(paginationFunction(
                                                filterFunction(
                                                            allCharacters, 
                                                            dataSearch.param1, 
                                                            dataSearch.param2, 
                                                            dataSearch.filterType),
                                                itemsPerPage, currentPage, itemsCount));
        //check if search match anything
        setNothingFound(nothingWasFound(filterFunction( allCharacters, 
                                        dataSearch.param1, 
                                        dataSearch.param2, 
                                        dataSearch.filterType)));
    }, [allCharactersRaw, currentPage, itemsPerPage]);

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
            setNothingFound(nothingWasFound(filterFunction( allCharacters, 
                                                            filterparam1, 
                                                            filterparam2, 
                                                            searchType)));
        }
    }, [filterparam1, currentPage, itemsPerPage]);

    const changeItemsPerPage = (howMany) => {
        setItemsPerPage(howMany);
    };

    const nextPage = () => {
        if(currentPage === pagesCount) {
           return setCurrentPage(1);
        }
        return setCurrentPage(currentPage + 1);
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
        setCurrentPage(1);
    };

    return(
        <div className={styles.mainView}>
            <Header />
            <FilterComponent filterParameters={(data1, data2, type) => filterHandler(data1, data2, type)} />
            <ItemsPerPage itemsPerPage={itemsPerPage} changeItemsPerPage={(howMany) => changeItemsPerPage(howMany)}/>
            <CharactersList characters={charactersToDisplay} currentPage={currentPage} searchMisMatch={nothingFound} />
            <PagesNavigation currentPage={currentPage} 
                             pagesCount={pagesCount}
                             previousPage={() => previousPage()}
                             nextPage={() => nextPage()} />
        </div>
    );
};

export default SearchResult;