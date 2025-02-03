import ratings from '../ratings.js'; 

function fetchRatings() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(ratings);
        }, 500);
    });
}

export default fetchRatings;