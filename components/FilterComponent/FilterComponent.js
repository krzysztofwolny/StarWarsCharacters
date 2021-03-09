import React, { useState } from 'react';

const FilterComponent = ({ filterParameters }) => {
    const [onFrom, setOnFrom] = useState(false);
    const [onTo, setOnTo] = useState(false);

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;
        switch(name) {
            case "onFrom":
                setOnFrom(value);
                break
            case "onTo":
                setOnTo(value);
                break
            default:
                return value
        }
    };

    const sendDataToFilter = (filterType, event) => {
        event.preventDefault();
        if(filterType === 'ordinaryNumber') {
            filterParameters(onFrom, onTo, filterType);
        }
    };

    return(
        <form>
            <label for="ON">from</label>
            <input  type="number" 
                    name="onFrom" 
                    value={onFrom}
                    placeholder="number"
                    onChange={(event) => onChangeHandler(event)}/>
            <label  for="ON">To</label>
            <input  type="number" 
                    name="onTo" 
                    value={onTo}
                    placeholder="number"
                    onChange={(event) => onChangeHandler(event)}/>
            <button onClick={(event) => sendDataToFilter("ordinaryNumber", event)}>Filter</button>
        </form>
    );
};

export default FilterComponent;