import React from 'react';
import styles from './ErrorInfo.module.scss';

const ErrorInfo = () => {

    return(
        <div className={styles.mainView}>
            <p className={styles.label}>Something went wrong! Go to main page.</p>
        </div>
    );
};

export default ErrorInfo;