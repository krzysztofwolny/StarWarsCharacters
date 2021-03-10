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

//takes name, height and eye color and store it in to local storage on favourites list
export const addToFavourites = (name, height, eyeColor) => {
    //check if the list of favourites in localStorage exist
    console.log('go!')
    const localStorageFavourites = localStorage.getItem('favourites');
    if(!localStorageFavourites) {
        //if not exist, create new
        const newFavouritesList = [`${name.replace(/\s/g, '')}${height}${eyeColor}`];
        localStorage.setItem('favourites', JSON.stringify(newFavouritesList));
    } else if (localStorageFavourites) {
        //if exists, take this list and update it with new favourite character
        let updateFavouritesList = JSON.parse(localStorageFavourites);
        const newFavouriteItem = `${name.replace(/\s/g, '')}${height}${eyeColor}`;
        updateFavouritesList.push(newFavouriteItem);
        localStorage.setItem('favourites', JSON.stringify(updateFavouritesList));
    }
};

//check if the character is in favourites
export const checkFavourites = (name, height, eyeColor) => {
    const localStorageFavourites = localStorage.getItem('favourites');
    //need to check if local storage exist, it does not on server side
    if(localStorageFavourites) {
        const getFavourites = JSON.parse(localStorageFavourites);
        const seekFor = `${name.replace(/\s/g, '')}${height}${eyeColor}`;
        return getFavourites.includes(seekFor);
    } else {
        return false
    }
}