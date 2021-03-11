import React, { useEffect, useState } from 'react';
import styles from './DetailedView.module.scss';
import { checkFavourites, addToFavourites } from '../../functions/storeFunctions';
import axios from 'axios';

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

    console.log('state', films)

    const displayFilms = (input) => {
        return input.map( el => {
            return <li>{el}</li>
        });
    };
    //change styles after fetcheds
    const fetchedStyles = isFetched ? `${styles.detailedView__films} ${styles.detailedView__fetched}` : styles.detailedView__films;

    return(
        <div>
            {isFavourite ? 'is one of the Favourites!' : 'not favourite'}
            <button onClick={() => addThisCharacterToFavourites()}>add to favourites</button>
            <p>{itemData.name}</p>
            <p>{itemData.birth_year}</p>
            <p>{itemData.eye_color}</p>
            <p>{itemData.gender}</p>
            <p>{itemData.hair_color}</p>
            <p>{itemData.height}</p>
            <p>{itemData.mass}</p>
            <p>{itemData.skin_color}</p>
            <p>{itemData.species}</p>
            <p className={fetchedStyles}>{displayFilms(homeworld)}</p>
            <p>Films</p>
            <ul className={fetchedStyles}>
                {displayFilms(films)}
            </ul>
        </div>
    );
};

export default DetailedView;