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
            <div className={styles.loading__wrapper}>
                <div className={styles.loading}>
                    <div className={styles.loading__inner}>
                        <div className={styles.loading__rotatingElm}></div>
                    </div>
                </div>
            </div>
        );
    }

    const displayInfo = waitToLong ? <p className={styles.charactersList__searchFailure}>No search results. Try to find something else.</p> : waiting();

    return(
        <>
        {displayInfo}
        </>
    );
}

export default Loading;