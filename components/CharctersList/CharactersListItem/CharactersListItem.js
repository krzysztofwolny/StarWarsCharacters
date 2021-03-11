import React, { useState, useEffect } from 'react';
import styles from './CharactersListItem.module.scss';
import Router from 'next/router';
import { addToFavourites, checkFavourites } from '../../../functions/storeFunctions';
import ShowSpeciesList from './ShowSppeciesList/ShowSpeciesList';


const CharactersListItem = ({ itemData, currentPage, change }) => {
    const [isFavourite, setIsFavourite] = useState(false);
    const [refresh, setRefresh] =useState(false)

    //trigering favourite status refresh after another searches
    useEffect(() => {
        setIsFavourite(checkFavourites(itemData.name, itemData.height, itemData.eye_color))
    }, [refresh, currentPage, change]);

    const addAndCheck = (name, height, eyeColor) => {
        addToFavourites(name, height, eyeColor);
        setIsFavourite(checkFavourites(itemData.name, itemData.height, itemData.eye_color));
        setRefresh(!refresh);
    };

    const goToDetailedView = () => {
        Router.push({
            pathname: '/detailed_view',
            query: { 
                ...itemData
            }
        });
    };

    return(
        <li key={itemData.on} className={styles.charactersListItem}>
            <p>{itemData.on}</p>
            <p onClick={() => goToDetailedView()}>Name: {itemData.name}</p>
            <p>Heigth: {itemData.height}</p>
            <p>Eye color: {itemData.eye_color}</p>
            <div className={styles.charactersListItem__species}>
                <p>Species:</p>
                <ShowSpeciesList dataList={itemData.species} />
            </div>
            <div onClick={() => addAndCheck(itemData.name, itemData.height, itemData.eye_color)}>
                {isFavourite ? 'isFav!' : 'notFav'}
            </div>
        </li>
    );
};

export default CharactersListItem;