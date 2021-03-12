import React, { useState, useEffect} from 'react';
import styles from './CharactersList.module.scss';

import CharactersListItem from './CharactersListItem/CharactersListItem';
import CharactersListHeader from './CharactersListHeader/CharactersListHeader';

const CharactersList = ({ characters, currentPage }) => {
    const [curPage, setCurPage] = useState(currentPage);
    const [change, setChange] = useState(false)
    useEffect(() => {
        setCurPage(currentPage);
        //force refresh of CharactersListItems
        setChange(!change);
    }, [currentPage, characters]);
    //printContent function takes all  characters and checks 
    //if there are species in each of them. 
    //If there are, it fetches their names.
    const printContent = () => {
        return characters.map( el => {
            return <CharactersListItem itemData={el} currentPage={curPage} change={change} />
        });
    };

    return(
        <ul className={styles.charactersList}>
            <CharactersListHeader />
            {printContent()}
        </ul>
    );
};

export default CharactersList;