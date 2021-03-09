import React from 'react';
import styles from './CharactersListItem.module.scss';
import ShowSpeciesList from './ShowSppeciesList/ShowSpeciesList';


const CharactersListItem = ({ itemData }) => {
    
    return(
        <li className={styles.charactersListItem}>
            <p>{itemData.on}</p>
            <p>Name: {itemData.name}</p>
            <p>Heigth: {itemData.height}</p>
            <p>Eye color: {itemData.eye_color}</p>
            <div className={styles.charactersListItem__species}>
                <p>Species:</p>
                <ShowSpeciesList dataList={itemData.species} />
            </div>
        </li>

    );
};

export default CharactersListItem;