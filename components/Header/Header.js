import React from 'react';
import Router from 'next/router';
import styles from './Header.module.scss';
import logo from '../../assets/svg/logo.svg'

const Header = () => {
    return(
        <header className={styles.header}>
            <img className={styles.header__logo} 
                 src={logo} 
                 alt='star wars characters logo'
                 onClick={() => Router.push('/') } />
            <h1 className={styles.header__mainSign}>Everything about Star Wars Characters!</h1>
        </header>
    );
};

export default Header;