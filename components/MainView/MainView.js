import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import styles from './MainView.module.scss';
import { paginationFunction, addOrdinalNumber } from '../../functions/filterFunction';
import { fetchAditionalData, fetchAllCharacters } from '../../store/actions';
//components imports
import CharactersList from '../CharctersList/CharactersList';
import FilterComponent from '../FilterComponent/FilterComponent';
import Header from '../Header/Header';
import ItemsPerPage from '../ItemsPerPage/ItemsPerPage';
import PagesNavigation from '../pagesNavigation/pagesNavigation';

const MainView = () => {
    const allCharactersRaw = useSelector(state => state.results);
    //add Ordinar Number to characters
    const allCharacters = addOrdinalNumber(allCharactersRaw);
    const itemsCount = useSelector(state => state.count);
    const [charactersToDisplay, setCharactersToDisplay] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [nextPageToDownload, setNextPageToDownload] = useState(2);

    const getNewCharacters = useDispatch();
    
    //display data at firs render
    useEffect(() => {
        if(allCharacters) {
            if(allCharacters.length <= itemsPerPage) {
                setCharactersToDisplay(allCharacters);
            }
        }
    }, [allCharactersRaw]);


    //update characters list
    useEffect(() => {
        if(allCharacters) {
        const copyAllCharacters = [...allCharacters];
        setCharactersToDisplay(paginationFunction(copyAllCharacters, itemsPerPage, currentPage, itemsCount));
        };
        if(allCharacters && allCharacters.length < (itemsPerPage * currentPage)) {
            getNewCharacters(fetchAditionalData(nextPageToDownload));
            setNextPageToDownload(nextPageToDownload + 1);
            const copyAllCharacters = [...allCharacters];
            setCharactersToDisplay(paginationFunction(copyAllCharacters, itemsPerPage, currentPage, itemsCount));
        };
    }, [allCharactersRaw, currentPage, itemsPerPage]);

    const changeItemsPerPage = (howMany) => {
        setItemsPerPage(howMany);
    };

    const nextPage = () => {
        if(currentPage === Math.ceil(itemsCount / itemsPerPage)) {
           return setCurrentPage(1);
        }
        return setCurrentPage(currentPage + 1);
    };

    const previousPage = () => {
        if(currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    //execute search from FilterComponent
    const filterHandler = (filterParameter1, filterParameter2, filterType) => {
        //fetch all characters for searching purposes
        getNewCharacters(fetchAllCharacters(itemsCount));
        Router.push({
            pathname: '/search_result',
            query: { 
                param1: filterParameter1,
                param2: filterParameter2,
                filterType: filterType
            }
        });
        setCurrentPage(1);
    }

    return(
        <div className={styles.mainView}>
            <Header />
            <FilterComponent filterParameters={(data1, data2, type) => filterHandler(data1, data2, type)} />
            <ItemsPerPage itemsPerPage={itemsPerPage} changeItemsPerPage={(howMany) => changeItemsPerPage(howMany)}/>
            <CharactersList characters={charactersToDisplay} currentPage={currentPage} />
            <PagesNavigation currentPage={currentPage} 
                             pagesCount={Math.ceil(itemsCount / itemsPerPage)}
                             previousPage={() => previousPage()}
                             nextPage={() => nextPage()} />
        </div>
    );
};

export default MainView;