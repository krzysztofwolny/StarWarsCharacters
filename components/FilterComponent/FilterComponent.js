import React, { useState } from 'react';
import styles from './FilterComponent.module.scss';
import Button from '../UIElements/Button/Button';

const FilterComponent = ({ filterParameters }) => {
    const [from, setOnFrom] = useState(false);
    const [to, setOnTo] = useState(false);
    const [name, setName] = useState("");
    const [searchType, setSearchType] = useState("ordinaryNumber");
    const [eyeColor, setEyeColor] = useState('');

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;
        switch(name) {
            case "onFrom":
                setOnFrom(value);
                break
            case "onTo":
                setOnTo(value);
                break
            case "fromHeight":
                setOnFrom(value);
                break
            case "toHeight":
                setOnTo(value);
                break
            case "name":
                setName(value);
                break
            case "eyecolor":
                setEyeColor(value);
                break
            default:
                return value
        }
    };

    const sendDataToFilter = (filterType, event) => {
        event.preventDefault();
        if(filterType === 'ordinaryNumber') {
            filterParameters(from, to, filterType);
        } else if (filterType === 'height') {
            filterParameters(from, to, filterType);
        } else if (filterType === 'name') {
            filterParameters(name, null, filterType);
        } else if (filterType === 'eyecolor') {
            filterParameters(eyeColor, null, filterType);
        }
    };

    const chooseSearchType = (event) => {
        event.preventDefault();
        setSearchType(event.target.value);
    };

    const showInput = () => {
        if(searchType === "ordinaryNumber") {
            return(
                <React.Fragment>
                    <label className={styles.filter__form_label} for="ON">from</label>
                    <input className={styles.filter__form_input} type="number" 
                            name="onFrom" 
                            value={from}
                            placeholder="from number"
                            onChange={(event) => onChangeHandler(event)}/>
                    <label className={styles.filter__form_label} for="ON">To</label>
                    <input className={styles.filter__form_input} type="number" 
                            name="onTo" 
                            value={to}
                            placeholder="to number"
                            onChange={(event) => onChangeHandler(event)}/>
                </React.Fragment>
            );
        } else if (searchType === "height") {
            return(
                <React.Fragment>
                    <label className={styles.filter__form_label} for="height">from</label>
                    <input className={styles.filter__form_input} type="number" 
                            name="fromHeight" 
                            value={from}
                            placeholder="from height"
                            onChange={(event) => onChangeHandler(event)}/>
                    <label className={styles.filter__form_label}  for="ON">To</label>
                    <input className={styles.filter__form_input} type="number" 
                            name="toHeight" 
                            value={to}
                            placeholder="to height"
                            onChange={(event) => onChangeHandler(event)}/>
                </React.Fragment>
            );
        } else if (searchType === "name") {
            return(
                <React.Fragment>
                <label className={styles.filter__form_label} for="name">Name</label>
                <input className={styles.filter__form_input} type="text" 
                        name="name" 
                        value={name}
                        placeholder="enter name"
                        onChange={(event) => onChangeHandler(event)}/>
                </React.Fragment>
            );
        } else if (searchType === "eyecolor") {
            return(
                <React.Fragment>
                <label className={styles.filter__form_label} for="name">Eye color</label>
                <input className={styles.filter__form_input} type="text" 
                        name="eyecolor" 
                        value={eyeColor}
                        placeholder="enter eye color"
                        onChange={(event) => onChangeHandler(event)}/>
                </React.Fragment>
            );
        }
    };

    //special search for favourites
    const showAllFavourites = (event) => {
        event.preventDefault();
        filterParameters(1, 1, 'favourites');
    }

    return(
        <div className={styles.filter}>
            <form className={styles.filter__form}>
                <div className={styles.filter__partials}>
                    {showInput()}
                    <select className={styles.filter__form_select} onChange={chooseSearchType}>
                        <option value="ordinaryNumber">by ordinary number</option>
                        <option value="height">by height</option>
                        <option value="name">by name</option>
                        <option value="eyecolor">by eye color</option>
                    </select>
                </div>
                <div className={styles.filter__partials}>
                    <Button clickAction={(event) => sendDataToFilter(searchType, event)}>Filter</Button>
                    <Button clickAction={(event) => showAllFavourites(event)}>Favourites</Button>
                </div>
            </form>
        </div>
    );
};

export default FilterComponent;