import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import styles from './DetailedView.module.scss';
import { checkFavourites, addToFavourites } from '../../functions/storeFunctions';
import axios from 'axios';
import starempty from '../../assets/svg/star-empty.svg';
import starfull from '../../assets/svg/star-full.svg';

import Header from '../Header/Header';
import Button from '../UIElements/Button/Button';

const DetailedView = ({ itemData }) => {
    const [isFavourite, setIsFavourite] = useState(checkFavourites(itemData.name, itemData.height, itemData.eye_color));
    const [films, setFilms] = useState([]);
    const [homeworld, setHomeworld] = useState([])
    const [isFetched, setIsFetched] = useState(false);

    const addThisCharacterToFavourites = () => {
        addToFavourites(itemData.name, itemData.height, itemData.eye_color);
        setIsFavourite(checkFavourites(itemData.name, itemData.height, itemData.eye_color));
    };

    const fetchItemsFromArray = (input) => {
        let output = [];
        if(typeof input === 'string') {
            let inputToArray = [];
            inputToArray.push(input);
            inputToArray.forEach(async el => {
                await axios.get(el)
                .then(res => output.push(res.data.title))
                .catch(e => console.log(e));
            });
        } else {
            input.forEach(async el => {
            await axios.get(el)
            .then(res => output.push(res.data.title))
            .catch(e => console.log(e));
        });
        }
        return output
    };

    const fetchHomeworld = (input) => {
        let output = [];
        let inputToArray = [];
            inputToArray.push(input);
            inputToArray.forEach(async el => {
                await axios.get(el)
                .then(res => output.push(res.data.name))
                .catch(e => console.log(e));
            });
        return output
    }

    //fetch films and homeworld name
    useEffect(() => {
        setFilms(fetchItemsFromArray(itemData.films));
        setHomeworld(fetchHomeworld(itemData.homeworld))
    }, [])

    //rerender after fetch
    useEffect(() => {
        setTimeout(() => {
            setIsFetched(true)
        }, 500);
    }, []);

    const displayDataFromArray = (input) => {
        return input.map( el => {
            return <li key={el} className={styles.detailedView__data_list}>{el}</li>
        });
    };
    //change styles after fetched
    const fetchedStyles = isFetched ? `${styles.detailedView__films} ${styles.detailedView__fetched}` : styles.detailedView__films;
    const ifIsFavourite = isFavourite ? starfull : starempty;

    return(
        <div className={styles.mainView}>
            <Header />
            <div className={styles.detailedView__favouriteSection}>
                {isFavourite ? 'is one of the Favourites! Click on star to toggle.' : 'Not favourite. Click on star to toggle'}
                <img src={ifIsFavourite} alt='favourite star logo' className={styles.detailedView__fav} onClick={() => addThisCharacterToFavourites()} />
            </div>
            <div className={styles.detailedView__data}>
                <div className={styles.detailedView__data_item}>
                    <p className={styles.detailedView__data_label}>Name: </p>
                    <p>{itemData.name}</p></div>
                <div className={styles.detailedView__data_item}>
                    <p className={styles.detailedView__data_label}>Birth date: </p> 
                    <p>{itemData.birth_year}</p></div>
                <div className={styles.detailedView__data_item}>
                    <p className={styles.detailedView__data_label}>Eye color: </p>
                    <p>{itemData.eye_color}</p></div>
                <div className={styles.detailedView__data_item}>
                    <p className={styles.detailedView__data_label}>Gender: </p>
                    <p>{itemData.gender}</p></div>
                <div className={styles.detailedView__data_item}>
                    <p className={styles.detailedView__data_label}>Hair color: </p>
                    <p>{itemData.hair_color}</p></div>
                <div className={styles.detailedView__data_item}>
                    <p className={styles.detailedView__data_label}>Height: </p>
                    <p>{itemData.height}</p></div>
                <div className={styles.detailedView__data_item}>
                    <p className={styles.detailedView__data_label}>Mass: </p>
                    <p>{itemData.mass}</p></div>
                <div className={styles.detailedView__data_item}>
                    <p className={styles.detailedView__data_label}>Skin color: </p>
                    <p>{itemData.skin_color}</p></div>
                <div className={styles.detailedView__data_item}>
                    <p className={styles.detailedView__data_label}>Species: </p>
                    <p>{itemData.species}</p></div>
                <div className={fetchedStyles}>
                    <p className={styles.detailedView__data_label}>Homeworld: </p> 
                    <p className={styles.detailedView__data_list}>{displayDataFromArray(homeworld)}</p></div>
                <div className={fetchedStyles}>
                    <p className={styles.detailedView__data_label}>Films:</p>
                <ul>
                    {displayDataFromArray(films)}
                </ul>
                </div>
                <div className={styles.detailedView__homepageButton}>
                    <Button clickAction={() => Router.push('/')}>Homepage</Button>
                </div> 
            </div>
        </div>
    );
};

export default DetailedView;