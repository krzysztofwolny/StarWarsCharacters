import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './MainView.module.scss';
import { paginationFunction } from '../../functions/filterFunction';
import { fetchAditionalData } from '../../store/actions';
 
import CharactersList from '../CharctersList/CharactersList';

const MainView = () => {
    const allCharacters = useSelector(state => state.results);
    const itemsCount = useSelector(state => state.count)
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
    }, [allCharacters]);

    //update characters list
    useEffect(() => {
        if(allCharacters) {
        const copyAllCharacters = [...allCharacters];
        console.log("długość tabeli characters", allCharacters.length)
        setCharactersToDisplay(paginationFunction(copyAllCharacters, itemsPerPage, currentPage, itemsCount));
        };
        if(allCharacters && allCharacters.length < (itemsPerPage * currentPage)) {
            console.log("pobieramy dane");
            getNewCharacters(fetchAditionalData(nextPageToDownload));
            setNextPageToDownload(nextPageToDownload + 1);
            const copyAllCharacters = [...allCharacters];
            setCharactersToDisplay(paginationFunction(copyAllCharacters, itemsPerPage, currentPage, itemsCount));
        };
    }, [allCharacters, currentPage, itemsPerPage]);

    const changeItemsPerPage = (howMany) => {
        event.preventDefault();
        setItemsPerPage(howMany);
    };

    const nextPage = () => {
        if(currentPage === Math.ceil(itemsCount / itemsPerPage)) {
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

    console.log("następna strona do pobrania", nextPageToDownload);

    return(
        <div className={styles.mainView}>
            <p>Showing {itemsPerPage} items per page</p>
            <button onClick={() => changeItemsPerPage(5)}>5 items per page</button>
            <button onClick={() => changeItemsPerPage(10)}>10 items per page</button>
            <CharactersList characters={charactersToDisplay}/>
            <div className={styles.mainView__pagesNav}>
                <button onClick={() => previousPage()}>Previous Page</button>
                <p>{currentPage} / {Math.ceil(itemsCount / itemsPerPage)}</p>
                <button onClick={() => nextPage()}>Next Page</button>
            </div>
        </div>
    );
};

export default MainView;