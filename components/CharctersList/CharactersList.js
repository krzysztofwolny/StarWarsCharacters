import React, { useState, useEffect} from 'react';
import styles from './CharactersList.module.scss';

import CharactersListItem from './CharactersListItem/CharactersListItem';
import CharactersListHeader from './CharactersListHeader/CharactersListHeader';
import Spinner from '../UIElements/Spinner/Spinner';

const CharactersList = ({ characters, currentPage }) => {
    const [curPage, setCurPage] = useState(currentPage);
    const [change, setChange] = useState(false);
    const [showSpinner, setShowSpinner] = useState(true);
    useEffect(() => {
        setCurPage(currentPage);
        //force refresh of CharactersListItems
        setChange(!change);
    }, [currentPage, characters]);

    //show spinner if characters are not loaded
    useEffect(() => {
        if(characters.length !== 0) {
            setShowSpinner(false);
        }
        setShowSpinner(true);
    }, [characters.length]);

    console.log(characters)
    //printContent function takes all  characters and checks 
    //if there are species in each of them. 
    //If there are, it fetches their names.
    const printContent = () => {
        return characters.map( el => {
            return <CharactersListItem key={el.on} itemData={el} currentPage={curPage} change={change} />
        });
    };

    return(
        <ul className={styles.charactersList}>
            <CharactersListHeader />
            {showSpinner ? <Spinner/> : null}
            {printContent()}
        </ul>
    );
};

export default CharactersList;