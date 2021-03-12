import React from 'react'
import styles from './Button.module.scss';

const Button = ({clickAction, children}) => {
    return(
        <button className={styles.button} onClick={clickAction}>{children}</button>
    );
}

export default Button;