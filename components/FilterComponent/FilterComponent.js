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
        switch(filterType) {
            case 'ordinaryNumber':  filterParameters(from, to, filterType);
                                    break
            case 'height':  filterParameters(from, to, filterType);
                            break
            case 'name':  filterParameters(name, null, filterType);
                          break
            case 'eyecolor': filterParameters(eyeColor, null, filterType);
                             break
            default: return filterType;
        };
    };

    const chooseSearchType = (event) => {
        event.preventDefault();
        setSearchType(event.target.value);
    };

    const showInput = () => {
        if(searchType === "ordinaryNumber") {
            return(
                <>
                    <label className={styles.filter__form_label} htmlFor="ON">from</label>
                    <input className={styles.filter__form_input} type="number" 
                            name="onFrom" 
                            value={from}
                            placeholder="from number"
                            onChange={(event) => onChangeHandler(event)}/>
                    <label className={styles.filter__form_label} htmlFor="ON">To</label>
                    <input className={styles.filter__form_input} type="number" 
                            name="onTo" 
                            value={to}
                            placeholder="to number"
                            onChange={(event) => onChangeHandler(event)}/>
                </>
            );
        };
        if (searchType === "height") {
            return(
                <>
                    <label className={styles.filter__form_label} htmlFor="height">from</label>
                    <input className={styles.filter__form_input} type="number" 
                            name="fromHeight" 
                            value={from}
                            placeholder="from height"
                            onChange={(event) => onChangeHandler(event)}/>
                    <label className={styles.filter__form_label} htmlFor="ON">To</label>
                    <input className={styles.filter__form_input} type="number" 
                            name="toHeight" 
                            value={to}
                            placeholder="to height"
                            onChange={(event) => onChangeHandler(event)}/>
                </>
            );
        };
        if (searchType === "name") {
            return(
                <>
                <label className={styles.filter__form_label} htmlFor="name">Name</label>
                <input className={styles.filter__form_input} type="text" 
                        name="name" 
                        value={name}
                        placeholder="enter name"
                        onChange={(event) => onChangeHandler(event)}/>
                </>
            );
        };
        if (searchType === "eyecolor") {
            return(
                <>
                <label className={styles.filter__form_label} htmlFor="name">Eye color</label>
                <input className={styles.filter__form_input} type="text" 
                        name="eyecolor" 
                        value={eyeColor}
                        placeholder="enter eye color"
                        onChange={(event) => onChangeHandler(event)}/>
                </>
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