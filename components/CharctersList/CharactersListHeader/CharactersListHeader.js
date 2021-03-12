import React from 'react';
import styles from './CharactersListHeader.module.scss';

const CharactersListHeader = () => {
    return(
        <li className={`${styles.charactersListItem} ${styles.charHeader}`}>
            <p className={`${styles.charactersListItem__cel} ${styles.charactersListItem__cel_num}`}>Num</p>
            <p className={`${styles.charactersListItem__cel} ${styles.charactersListItem__cel_name}`}>Name</p>
            <p className={`${styles.charactersListItem__cel} ${styles.charactersListItem__cel_height}`}>Heigth</p>
            <p className={`${styles.charactersListItem__cel} ${styles.charactersListItem__cel_eyecolor}`}>Eye color</p>
            <p className={`${styles.charactersListItem__cel} ${styles.charactersListItem__cel_species}`}>Species</p>
            <p className={`${styles.charactersListItem__cel} ${styles.charactersListItem__cel_isFavourite}`}>is favourite?</p>
        </li>
    );
};

export default CharactersListHeader;