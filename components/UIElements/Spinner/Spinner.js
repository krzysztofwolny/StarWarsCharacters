import React from 'react';
import styles from './Spinner.module.scss';

const Spinner = () => {
    return(
        <div className={styles.spinner}>
            <div className={styles.spinner__inner}>
                <div className={styles.spinner__rotatingElm}></div>
            </div>
        </div>
    );
}

export default Spinner;