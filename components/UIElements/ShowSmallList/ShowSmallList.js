import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ShowSmallList.module.scss';

const ShowSmallList = ({dataList}) => {
    const [speciesNames, setSpeciesNames] = useState([]);
    const fetchSpeciesNames = () => {
        let namesList = [];
        if(dataList.length !== 0) {
            dataList.forEach( async el => {
                await axios.get(el)
                .then((res) => {
                    namesList.push(res.data.name)
                })
                .catch((e) => console.log(e));
            });
        } else {
            namesList.push("no species");
        }
        return namesList
    }
    useEffect(() => {
        setSpeciesNames(fetchSpeciesNames());
    }, [dataList]);

    const printSpeciesList = () => {
        return speciesNames.map( el => {
            return <p>{el}</p>
        });
    }

    return(
        <div className={styles.showSmallList}>{printSpeciesList()}</div>
            
    );
};

export default ShowSmallList;