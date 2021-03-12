import React from 'react';
import styles from './ItemsPerPage.module.scss';
import Button from '../UIElements/Button/Button';

const ItemsPerPage = ({itemsPerPage, changeItemsPerPage}) => {
    return(
        <div className={styles.itemsPerPage}>
            <h2 className={styles.itemsPerPage__label}>Showing {itemsPerPage} items per page</h2>
            <Button clickAction={() => changeItemsPerPage(5)}><p className={styles.itemsPerPage__buttonLabel}>show 5</p></Button>
            <Button clickAction={() => changeItemsPerPage(10)}><p className={styles.itemsPerPage__buttonLabel}>show 10</p></Button>
        </div>
    );
};

export default ItemsPerPage