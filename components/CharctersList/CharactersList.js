import React from 'react';
import styles from './CharactersList.module.scss';

import CharactersListItem from './CharactersListItem/CharactersListItem';

const CharactersList = ({ characters }) => {
    //printContent function takes all  characters and checks 
    //if there are species in each of them. 
    //If there are, it fetches their names.
    const printContent = () => {
        return characters.map( el => {
            return <CharactersListItem itemData={el} />
        });
    };

    return(
        <ul className={styles.charactersList}>
            {printContent()}
        </ul>
    );
};

export default CharactersList;