import React from 'react';
import styles from './pagesNavigation.module.scss';
import Button from '../UIElements/Button/Button';

const pagesNavigation = ({ currentPage, pagesCount, previousPage, nextPage }) => {
    return(
        <div className={styles.pagesNav}>
            <Button clickAction={() => previousPage()}>Previous</Button>
            <p className={styles.pagesNav__numbers}>{currentPage} / {pagesCount}</p>
            <Button clickAction={() => nextPage()}>Next</Button>
        </div>
    );
};

export default pagesNavigation;