import React, { useState, useEffect } from 'react';
import styles from './ShowSpeciesList.module.scss';

const ShowSpeciesList = ({dataList}) => {
    const [isFetched, setIsFetched] = useState(false);

    //force component rerender after fetching the species names
    useEffect(() => {
        setTimeout(() => {
            setIsFetched(true)
        }, 500);
    }, []);

    const printSpeciesList = () => {
        return dataList.map( el => {
            return <p>{el}</p>
        });
    };

    const checkFetch = isFetched ? `${styles.showSmallList} ${styles.showSmallList__fetched}` : styles.showSmallList;

    return(
        <div className={checkFetch}>{printSpeciesList()}</div>
            
    );
};

export default ShowSpeciesList;