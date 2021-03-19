import React, { useState, useEffect } from 'react';
import styles from './Loading.module.scss';

const Loading = () => {
    //if component waits for data too long
    const [waitToLong, setWaitToLong] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setWaitToLong(true);
        }, 1000 * 6)
    }, []);

    const waiting = () => {
        return(
            <div className={styles.spinner}>
                <div className={styles.spinner__inner}>
                    <div className={styles.spinner__rotatingElm}></div>
                </div>
            </div>
        );
    }

    const displayInfo = waitToLong ? <p>No search results. Try to find something else.</p> : waiting();

    return(
        <>
        {displayInfo}
        </>
    );
}

export default Loading;