import React, { useState } from 'react';
import styles from './CharactersListItem.module.scss';
import { addToFavourites, checkFavourites } from '../../../functions/storeFunctions';
import ShowSpeciesList from './ShowSppeciesList/ShowSpeciesList';


const CharactersListItem = ({ itemData }) => {
    const [isFavourite] = useState(checkFavourites(itemData.name, itemData.heigh, itemData.eye_color));

    console.log(itemData.name, isFavourite)

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
            <div onClick={() => addToFavourites(itemData.name, itemData.height, itemData.eye_color)}>
                {isFavourite ? 'isFav!' : 'notFav'}
            </div>
        </li>
    );
};

export default CharactersListItem;