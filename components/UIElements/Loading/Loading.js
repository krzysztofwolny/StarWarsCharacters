import React from 'react';
import styles from './Loading.module.scss';

const Loading = () => {
    return(
        <div className={styles.spinner}>
            <div className={styles.spinner__inner}>
                <div className={styles.spinner__rotatingElm}></div>
            </div>
        </div>
    );
}

export default Loading;