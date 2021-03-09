import axios from 'axios';

//takes array of urls and returns arry of fetched names
export const insertSpeciesNames = (arrayWithURLs) => {
    let outputArray = [];
    if(arrayWithURLs.length !== 0) {
        arrayWithURLs.forEach( async el => {
            await axios.get(el)
            .then((res) => {
                outputArray.push(res.data.name)
            })
            .catch((e) => console.log(e));
        });
    } else {
        outputArray.push("unknown")
    }
    return outputArray;
};