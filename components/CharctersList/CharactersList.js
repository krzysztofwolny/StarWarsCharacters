import React, { useState, useEffect} from 'react';
import styles from './CharactersList.module.scss';

import CharactersListItem from './CharactersListItem/CharactersListItem';
import CharactersListHeader from './CharactersListHeader/CharactersListHeader';
import Loading from '../UIElements/Loading/Loading';

const CharactersList = ({ characters, currentPage, searchMisMatch }) => {
    const [curPage, setCurPage] = useState(currentPage);
    const [change, setChange] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        setCurPage(currentPage);
        //force refresh of CharactersListItems
        setChange(!change);
    }, [currentPage, characters]);

    //show spinner if characters are not loaded
    useEffect(() => {
        if(characters.length !== 0 && searchMisMatch === false) {
            setShowSpinner(false);
        } else if (characters.length === 0 && searchMisMatch === false) {
            setShowSpinner(true);
        } else if (characters.length === 0 && searchMisMatch === true) {
            setShowSpinner(false);
        } 
    }, [characters.length, searchMisMatch]);
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
            {showSpinner ? <Loading/> : null}
            {searchMisMatch ? <p className={styles.charactersList__searchFailure}>No search results. Try to find something else.</p> : null}
            {printContent()}
        </ul>
    );
};

export default CharactersList;