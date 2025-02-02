import mockData from "./mockData.js";

export default async function fetchPlaylists() {
    return new Promise((resolve) => {
        setTimeout (() => resolve(mockData), 500);
    });
}