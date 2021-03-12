import React, { useState, useEffect } from 'react';
import styles from './CharactersListItem.module.scss';
import Router from 'next/router';
import { addToFavourites, checkFavourites } from '../../../functions/storeFunctions';
import ShowSpeciesList from './ShowSppeciesList/ShowSpeciesList';
import starfull from '../../../assets/svg/star-full.svg';
import starempty from '../../../assets/svg/star-empty.svg';

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

    //decide which star logo should be used
    const favouriteStarLogo = isFavourite ? starfull : starempty;

    return(
        <li key={itemData.on} className={`${styles.charactersListItem} ${styles.charactersListItem__cells}`}>
            <p className={`${styles.charactersListItem__cel} ${styles.charactersListItem__cel_num}`}>{itemData.on}</p>
            <p className={`${styles.charactersListItem__cel} ${styles.charactersListItem__cel_name}`} onClick={() => goToDetailedView()}>{itemData.name}</p>
            <p className={`${styles.charactersListItem__cel} ${styles.charactersListItem__cel_height}`}>{itemData.height}</p>
            <p className={`${styles.charactersListItem__cel} ${styles.charactersListItem__cel_eyecolor}`}>{itemData.eye_color}</p>
            <div className={`${styles.charactersListItem__cel} ${styles.charactersListItem__cel_species}`}>
                <ShowSpeciesList dataList={itemData.species} />
            </div>
            <div className={`${styles.charactersListItem__cel} ${styles.charactersListItem__cel_isFavourite}`} onClick={() => addAndCheck(itemData.name, itemData.height, itemData.eye_color)}>
                    <img src={favouriteStarLogo} className={styles.charactersListItem__fav} alt='star svg'/>
            </div>
        </li>
    );
};

export default CharactersListItem;