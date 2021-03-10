import React, { useState } from 'react';
import styles from './FilterComponent.module.scss';

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
                    <label for="ON">from</label>
                    <input  type="number" 
                            name="onFrom" 
                            value={from}
                            placeholder="number"
                            onChange={(event) => onChangeHandler(event)}/>
                    <label  for="ON">To</label>
                    <input  type="number" 
                            name="onTo" 
                            value={to}
                            placeholder="number"
                            onChange={(event) => onChangeHandler(event)}/>
                </React.Fragment>
            );
        } else if (searchType === "height") {
            return(
                <React.Fragment>
                    <label for="height">from</label>
                    <input  type="number" 
                            name="fromHeight" 
                            value={from}
                            placeholder="from height"
                            onChange={(event) => onChangeHandler(event)}/>
                    <label  for="ON">To</label>
                    <input  type="number" 
                            name="toHeight" 
                            value={to}
                            placeholder="to height"
                            onChange={(event) => onChangeHandler(event)}/>
                </React.Fragment>
            );
        } else if (searchType === "name") {
            return(
                <React.Fragment>
                <label for="name">Name</label>
                <input  type="text" 
                        name="name" 
                        value={name}
                        placeholder="name"
                        onChange={(event) => onChangeHandler(event)}/>
                </React.Fragment>
            );
        } else if (searchType === "eyecolor") {
            return(
                <React.Fragment>
                <label for="name">Eye color</label>
                <input  type="text" 
                        name="eyecolor" 
                        value={eyeColor}
                        placeholder="eye color"
                        onChange={(event) => onChangeHandler(event)}/>
                </React.Fragment>
            );
        }
    };

    return(
        <div className={styles.filter}>
            <form className={styles.filter__form}>
                {showInput()}
                <div>
                    <select onChange={chooseSearchType}>
                        <option value="ordinayNumber">by ordinary number</option>
                        <option value="height">by height</option>
                        <option value="name">by name</option>
                        <option value="eyecolor">by eye color</option>
                    </select>
                </div>
                <button onClick={(event) => sendDataToFilter(searchType, event)}>Filter</button>
            </form>
        </div>
    );
};

export default FilterComponent;